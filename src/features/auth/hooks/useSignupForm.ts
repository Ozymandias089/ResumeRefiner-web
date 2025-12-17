"use client"

import { useEffect, useMemo, useState } from "react"
import { currentUserStore } from "@/features/auth/current-user-store"
import { authApi } from "../api"

const HANDLE_REGEX = /^[a-zA-Z0-9_]+$/
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

type Status = "idle" | "checking" | "available" | "taken" | "invalid" | "error"
type PasswordMatchStatus = "idle" | "match" | "mismatch"

export function useSignupForm(defaultEmail?: string) {
  const [handle, setHandle] = useState("")
  const [handleStatus, setHandleStatus] = useState<Status>("idle")
  const [handleMessage, setHandleMessage] = useState("")

  const [email, setEmail] = useState(defaultEmail ?? "")
  const [emailStatus, setEmailStatus] = useState<Status>("idle")
  const [emailMessage, setEmailMessage] = useState("")

  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [passwordMatchStatus, setPasswordMatchStatus] =
    useState<PasswordMatchStatus>("idle")
  const [passwordMessage, setPasswordMessage] = useState("최소 8자 이상이어야 합니다.")

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  // 1) handle check (debounced)
  useEffect(() => {
    if (!handle) {
      setHandleStatus("idle")
      setHandleMessage("")
      return
    }
    if (!HANDLE_REGEX.test(handle)) {
      setHandleStatus("invalid")
      setHandleMessage("알파벳, 숫자, 밑줄(_)만 사용할 수 있습니다.")
      return
    }

    setHandleStatus("checking")
    setHandleMessage("사용 가능 여부를 확인하는 중입니다...")

    const controller = new AbortController()
    const timeoutId = setTimeout(async () => {
      try {
        const data = await authApi.checkHandle(handle)
        if (controller.signal.aborted) return

        if (data.handle !== handle) return
        if (data.isAvailable) {
          setHandleStatus("available")
          setHandleMessage("사용 가능한 핸들입니다.")
        } else {
          setHandleStatus("taken")
          setHandleMessage("이미 사용 중인 핸들입니다.")
        }
      } catch {
        if (controller.signal.aborted) return
        setHandleStatus("error")
        setHandleMessage("핸들 확인 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.")
      }
    }, 400)

    return () => {
      clearTimeout(timeoutId)
      controller.abort()
    }
  }, [handle])

  // 2) email check (debounced)
  useEffect(() => {
    if (!email) {
      setEmailStatus("idle")
      setEmailMessage("")
      return
    }
    if (!EMAIL_REGEX.test(email)) {
      setEmailStatus("invalid")
      setEmailMessage("유효한 이메일 형식이 아닙니다.")
      return
    }

    setEmailStatus("checking")
    setEmailMessage("사용 가능 여부를 확인하는 중입니다...")

    const controller = new AbortController()
    const timeoutId = setTimeout(async () => {
      try {
        const data = await authApi.checkEmail(email)
        if (controller.signal.aborted) return

        if (data.email !== email) return
        if (data.isAvailable) {
          setEmailStatus("available")
          setEmailMessage("사용 가능한 이메일입니다.")
        } else {
          setEmailStatus("taken")
          setEmailMessage("이미 사용 중인 이메일입니다.")
        }
      } catch {
        if (controller.signal.aborted) return
        setEmailStatus("error")
        setEmailMessage("이메일 확인 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.")
      }
    }, 400)

    return () => {
      clearTimeout(timeoutId)
      controller.abort()
    }
  }, [email])

  // 3) password match
  useEffect(() => {
    if (!password && !confirmPassword) {
      setPasswordMatchStatus("idle")
      setPasswordMessage("최소 8자 이상이어야 합니다.")
      return
    }
    if (password.length < 8) {
      setPasswordMatchStatus("mismatch")
      setPasswordMessage("비밀번호는 최소 8자 이상이어야 합니다.")
      return
    }
    if (!confirmPassword) {
      setPasswordMatchStatus("idle")
      setPasswordMessage("비밀번호를 다시 한 번 입력해 주세요.")
      return
    }
    if (password === confirmPassword) {
      setPasswordMatchStatus("match")
      setPasswordMessage("비밀번호가 일치합니다.")
    } else {
      setPasswordMatchStatus("mismatch")
      setPasswordMessage("비밀번호와 비밀번호 확인이 일치하지 않습니다.")
    }
  }, [password, confirmPassword])

  const canSubmit = useMemo(
    () =>
      handleStatus === "available" &&
      emailStatus === "available" &&
      passwordMatchStatus === "match" &&
      !isSubmitting,
    [handleStatus, emailStatus, passwordMatchStatus, isSubmitting]
  )

  async function submit(form: { name: string }) {
    setSubmitError(null)

    const name = form.name.trim()
    if (!name || !handle || !email || !password || !confirmPassword) {
      setSubmitError("모든 필드를 입력해 주세요.")
      return { ok: false as const }
    }
    if (!canSubmit) {
      setSubmitError("입력값을 다시 확인해 주세요.")
      return { ok: false as const }
    }

    setIsSubmitting(true)
    try {
      await authApi.register({ name, handle, email, password })

      // ✅ 회원가입 직후 세션이 생기면 바로 me를 새로 로드
      await currentUserStore.refresh()

      return { ok: true as const }
    } catch (e: any) {
      setSubmitError(e?.message ?? "회원가입에 실패했습니다.")
      return { ok: false as const }
    } finally {
      setIsSubmitting(false)
    }
  }

  const isHandleError = ["invalid", "taken", "error"].includes(handleStatus)
  const isHandleSuccess = handleStatus === "available"
  const isEmailError = ["invalid", "taken", "error"].includes(emailStatus)
  const isEmailSuccess = emailStatus === "available"
  const isPasswordError = passwordMatchStatus === "mismatch"
  const isPasswordSuccess = passwordMatchStatus === "match"

  return {
    // values
    handle,
    email,
    password,
    confirmPassword,

    // setters
    setHandle,
    setEmail,
    setPassword,
    setConfirmPassword,

    // ui states
    handleStatus,
    handleMessage,
    emailStatus,
    emailMessage,
    passwordMatchStatus,
    passwordMessage,

    isSubmitting,
    submitError,

    isHandleError,
    isHandleSuccess,
    isEmailError,
    isEmailSuccess,
    isPasswordError,
    isPasswordSuccess,

    canSubmit,
    submit,
  }
}
