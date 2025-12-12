"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useSignupForm } from "@/features/auth/hooks/useSignupForm"

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

export function SignupForm({
  className,
  defaultEmail,
  ...props
}: SignupFormProps) {
  const router = useRouter()
  const f = useSignupForm(defaultEmail)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    const name = String(fd.get("name") || "")
    const result = await f.submit({ name })
    if (result.ok) router.push("/dashboard")
  }

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
                  value={f.handle}
                  onChange={(e) => f.setHandle(e.target.value)}
                  required
                  aria-invalid={f.isHandleError}
                  className={cn(
                    f.isHandleError &&
                      "border-destructive focus-visible:ring-destructive",
                    f.isHandleSuccess &&
                      "border-emerald-500 focus-visible:ring-emerald-500"
                  )}
                />
                <FieldDescription
                  className={cn(
                    f.isHandleError && "text-destructive",
                    f.isHandleSuccess && "text-emerald-600"
                  )}
                >
                  {f.handleMessage ||
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
                  value={f.email}
                  onChange={(e) => f.setEmail(e.target.value)}
                  required
                  aria-invalid={f.isEmailError}
                  className={cn(
                    f.isEmailError &&
                      "border-destructive focus-visible:ring-destructive",
                    f.isEmailSuccess &&
                      "border-emerald-500 focus-visible:ring-emerald-500"
                  )}
                />
                <FieldDescription
                  className={cn(
                    f.isEmailError && "text-destructive",
                    f.isEmailSuccess && "text-emerald-600"
                  )}
                >
                  {f.emailMessage || "로그인 및 알림 수신에 사용될 이메일입니다."}
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
                      value={f.password}
                      onChange={(e) => f.setPassword(e.target.value)}
                      required
                      aria-invalid={f.isPasswordError}
                      className={cn(
                        f.isPasswordError &&
                          "border-destructive focus-visible:ring-destructive",
                        f.isPasswordSuccess &&
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
                      value={f.confirmPassword}
                      onChange={(e) => f.setConfirmPassword(e.target.value)}
                      required
                      aria-invalid={f.isPasswordError}
                      className={cn(
                        f.isPasswordError &&
                          "border-destructive focus-visible:ring-destructive",
                        f.isPasswordSuccess &&
                          "border-emerald-500 focus-visible:ring-emerald-500"
                      )}
                    />
                  </Field>
                </Field>
                <FieldDescription
                  className={cn(
                    f.isPasswordError && "text-destructive",
                    f.isPasswordSuccess && "text-emerald-600"
                  )}
                >
                  {f.passwordMessage || "최소 8자 이상이어야 합니다."}
                </FieldDescription>
              </Field>

              {/* 제출 버튼 */}
              <Field>
                <Button
                  type="submit"
                  disabled={f.isSubmitting || !f.canSubmit}
                  className="w-full"
                >
                  {f.isSubmitting ? "가입 처리 중..." : "계정 만들기"}
                </Button>
                <FieldDescription className="text-center">
                  이미 계정이 있으신가요? <Link href="/login">로그인</Link>
                </FieldDescription>
              </Field>

              {f.submitError && (
                <FieldDescription className="text-center text-destructive">
                  {f.submitError}
                </FieldDescription>
              )}
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
      <FieldDescription className="px-6 text-center">
        계속 진행하면, <a href="/terms">서비스 이용약관</a> 및{" "}
        <a href="/privacy">개인정보 처리방침</a>에 동의하는 것으로 간주합니다.
      </FieldDescription>
    </div>
  );
}
