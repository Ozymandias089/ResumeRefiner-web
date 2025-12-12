"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

type SignupFormProps = React.ComponentProps<"div"> & {
  defaultEmail?: string;
};

const HANDLE_REGEX = /^[a-zA-Z0-9_]+$/;

type HandleStatus =
  | "idle"
  | "checking"
  | "available"
  | "taken"
  | "invalid"
  | "error";

type EmailStatus =
  | "idle"
  | "checking"
  | "available"
  | "taken"
  | "invalid"
  | "error";

type PasswordMatchStatus = "idle" | "match" | "mismatch";

export function SignupForm({
  className,
  defaultEmail,
  ...props
}: SignupFormProps) {
  const router = useRouter();

  // ------------------------------
  // 핸들 상태
  // ------------------------------
  const [handle, setHandle] = useState("");
  const [handleStatus, setHandleStatus] = useState<HandleStatus>("idle");
  const [handleMessage, setHandleMessage] = useState<string>("");

  // ------------------------------
  // 이메일 상태
  // ------------------------------
  const [email, setEmail] = useState(defaultEmail ?? "");
  const [emailStatus, setEmailStatus] = useState<EmailStatus>("idle");
  const [emailMessage, setEmailMessage] = useState<string>("");

  // ------------------------------
  // 패스워드 상태
  // ------------------------------
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMatchStatus, setPasswordMatchStatus] =
    useState<PasswordMatchStatus>("idle");
  const [passwordMessage, setPasswordMessage] = useState<string>("");

  // ------------------------------
  // 제출 상태
  // ------------------------------
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // -----------------------------------
  // 1) 핸들 실시간 검사
  // -----------------------------------
  useEffect(() => {
    if (!handle) {
      setHandleStatus("idle");
      setHandleMessage("");
      return;
    }

    if (!HANDLE_REGEX.test(handle)) {
      setHandleStatus("invalid");
      setHandleMessage("알파벳, 숫자, 밑줄(_)만 사용할 수 있습니다.");
      return;
    }

    setHandleStatus("checking");
    setHandleMessage("사용 가능 여부를 확인하는 중입니다...");

    const controller = new AbortController();
    const timeoutId = setTimeout(async () => {
      try {
        const res = await fetch(
          `/api/handle/check?handle=${encodeURIComponent(handle)}`,
          { signal: controller.signal }
        );

        if (!res.ok) {
          throw new Error("Failed to check handle");
        }

        const data: { handle: string; isAvailable: boolean } = await res.json();

        if (data.handle !== handle) return;

        if (data.isAvailable) {
          setHandleStatus("available");
          setHandleMessage("사용 가능한 핸들입니다.");
        } else {
          setHandleStatus("taken");
          setHandleMessage("이미 사용 중인 핸들입니다.");
        }
      } catch (error) {
        if (controller.signal.aborted) return;
        setHandleStatus("error");
        setHandleMessage(
          "핸들 확인 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요."
        );
      }
    }, 400);

    return () => {
      clearTimeout(timeoutId);
      controller.abort();
    };
  }, [handle]);

  const isHandleError =
    handleStatus === "invalid" ||
    handleStatus === "taken" ||
    handleStatus === "error";
  const isHandleSuccess = handleStatus === "available";

  // -----------------------------------
  // 2) 이메일 실시간 검사 (중복 + 형식)
  // -----------------------------------
  useEffect(() => {
    if (!email) {
      setEmailStatus("idle");
      setEmailMessage("");
      return;
    }

    // 기본적인 이메일 형식 체크 (간단 버전)
    const simpleEmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!simpleEmailRegex.test(email)) {
      setEmailStatus("invalid");
      setEmailMessage("유효한 이메일 형식이 아닙니다.");
      return;
    }

    setEmailStatus("checking");
    setEmailMessage("사용 가능 여부를 확인하는 중입니다...");

    const controller = new AbortController();
    const timeoutId = setTimeout(async () => {
      try {
        // 🔧 여기 URL을 실제 백엔드 이메일 중복 확인 API에 맞게 수정
        const res = await fetch(
          `$/api/email/check?email=${encodeURIComponent(email)}`,
          { signal: controller.signal }
        );

        if (!res.ok) {
          throw new Error("Failed to check email");
        }

        const data: { email: string; isAvailable: boolean } = await res.json();

        if (data.email !== email) return;

        if (data.isAvailable) {
          setEmailStatus("available");
          setEmailMessage("사용 가능한 이메일입니다.");
        } else {
          setEmailStatus("taken");
          setEmailMessage("이미 사용 중인 이메일입니다.");
        }
      } catch (error) {
        if (controller.signal.aborted) return;
        setEmailStatus("error");
        setEmailMessage(
          "이메일 확인 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요."
        );
      }
    }, 400);

    return () => {
      clearTimeout(timeoutId);
      controller.abort();
    };
  }, [email]);

  const isEmailError =
    emailStatus === "invalid" ||
    emailStatus === "taken" ||
    emailStatus === "error";
  const isEmailSuccess = emailStatus === "available";

  // -----------------------------------
  // 3) 패스워드 / 패스워드 확인 일치 검사
  // -----------------------------------
  useEffect(() => {
    if (!password && !confirmPassword) {
      setPasswordMatchStatus("idle");
      setPasswordMessage("최소 8자 이상이어야 합니다.");
      return;
    }

    if (password.length < 8) {
      setPasswordMatchStatus("mismatch");
      setPasswordMessage("비밀번호는 최소 8자 이상이어야 합니다.");
      return;
    }

    if (!confirmPassword) {
      setPasswordMatchStatus("idle");
      setPasswordMessage("비밀번호를 다시 한 번 입력해 주세요.");
      return;
    }

    if (password === confirmPassword) {
      setPasswordMatchStatus("match");
      setPasswordMessage("비밀번호가 일치합니다.");
    } else {
      setPasswordMatchStatus("mismatch");
      setPasswordMessage("비밀번호와 비밀번호 확인이 일치하지 않습니다.");
    }
  }, [password, confirmPassword]);

  const isPasswordError = passwordMatchStatus === "mismatch";
  const isPasswordSuccess = passwordMatchStatus === "match";

  // -----------------------------------
  // 4) 전체 폼 유효성
  // -----------------------------------
  const canSubmit =
    handleStatus === "available" &&
    emailStatus === "available" &&
    passwordMatchStatus === "match";

  // -----------------------------------
  // 5) 회원가입 제출
  // -----------------------------------
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitError(null);

    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") || "").trim();
    const handleValue = String(formData.get("handle") || "").trim();
    const emailValue = String(formData.get("email") || "").trim();

    if (!name || !handleValue || !emailValue || !password || !confirmPassword) {
      setSubmitError("모든 필드를 입력해 주세요.");
      return;
    }

    if (!canSubmit) {
      setSubmitError("입력값을 다시 확인해 주세요.");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch(`/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          handle: handleValue,
          email: emailValue,
          password,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        const message = data?.message || "회원가입 중 오류가 발생했습니다.";
        throw new Error(message);
      }

      router.push("/dashboard");
    } catch (error: any) {
      setSubmitError(error.message || "회원가입에 실패했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">계정을 생성하세요</CardTitle>
          <CardDescription>
            아래 정보를 입력해 ResumeRefiner 계정을 만들 수 있습니다.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <FieldGroup>
              {/* 이름 */}
              <Field>
                <FieldLabel htmlFor="name">이름</FieldLabel>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="홍길동"
                  required
                />
              </Field>

              {/* 핸들 */}
              <Field>
                <FieldLabel htmlFor="handle">핸들</FieldLabel>
                <Input
                  id="handle"
                  name="handle"
                  type="text"
                  placeholder="yourhandle"
                  value={handle}
                  onChange={(e) => setHandle(e.target.value)}
                  required
                  aria-invalid={isHandleError}
                  className={cn(
                    isHandleError &&
                      "border-destructive focus-visible:ring-destructive",
                    isHandleSuccess &&
                      "border-emerald-500 focus-visible:ring-emerald-500"
                  )}
                />
                <FieldDescription
                  className={cn(
                    isHandleError && "text-destructive",
                    isHandleSuccess && "text-emerald-600"
                  )}
                >
                  {handleMessage ||
                    "변경 불가 · 알파벳/숫자/밑줄(_)만 허용됩니다."}
                </FieldDescription>
              </Field>

              {/* 이메일 */}
              <Field>
                <FieldLabel htmlFor="email">이메일</FieldLabel>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  aria-invalid={isEmailError}
                  className={cn(
                    isEmailError &&
                      "border-destructive focus-visible:ring-destructive",
                    isEmailSuccess &&
                      "border-emerald-500 focus-visible:ring-emerald-500"
                  )}
                />
                <FieldDescription
                  className={cn(
                    isEmailError && "text-destructive",
                    isEmailSuccess && "text-emerald-600"
                  )}
                >
                  {emailMessage || "로그인 및 알림 수신에 사용될 이메일입니다."}
                </FieldDescription>
              </Field>

              {/* 비밀번호 / 비밀번호 확인 */}
              <Field>
                <Field className="grid grid-cols-2 gap-4">
                  <Field>
                    <FieldLabel htmlFor="password">비밀번호</FieldLabel>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      aria-invalid={isPasswordError}
                      className={cn(
                        isPasswordError &&
                          "border-destructive focus-visible:ring-destructive",
                        isPasswordSuccess &&
                          "border-emerald-500 focus-visible:ring-emerald-500"
                      )}
                    />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="confirm-password">
                      비밀번호 확인
                    </FieldLabel>
                    <Input
                      id="confirm-password"
                      name="confirmPassword"
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      aria-invalid={isPasswordError}
                      className={cn(
                        isPasswordError &&
                          "border-destructive focus-visible:ring-destructive",
                        isPasswordSuccess &&
                          "border-emerald-500 focus-visible:ring-emerald-500"
                      )}
                    />
                  </Field>
                </Field>
                <FieldDescription
                  className={cn(
                    isPasswordError && "text-destructive",
                    isPasswordSuccess && "text-emerald-600"
                  )}
                >
                  {passwordMessage || "최소 8자 이상이어야 합니다."}
                </FieldDescription>
              </Field>

              {/* 제출 버튼 */}
              <Field>
                <Button
                  type="submit"
                  disabled={isSubmitting || !canSubmit}
                  className="w-full"
                >
                  {isSubmitting ? "가입 처리 중..." : "계정 만들기"}
                </Button>
                <FieldDescription className="text-center">
                  이미 계정이 있으신가요? <Link href="/login">로그인</Link>
                </FieldDescription>
              </Field>

              {submitError && (
                <FieldDescription className="text-center text-destructive">
                  {submitError}
                </FieldDescription>
              )}
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
      <FieldDescription className="px-6 text-center">
        계속 진행하면, <a href="#">서비스 이용약관</a> 및{" "}
        <a href="#">개인정보 처리방침</a>에 동의하는 것으로 간주합니다.
      </FieldDescription>
    </div>
  );
}
