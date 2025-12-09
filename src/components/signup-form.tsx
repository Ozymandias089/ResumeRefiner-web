"use client";

import { useEffect, useState } from "react";
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

export function SignupForm({
  className,
  defaultEmail,
  ...props
}: SignupFormProps) {
  const [handle, setHandle] = useState("");
  const [handleStatus, setHandleStatus] = useState<HandleStatus>("idle");
  const [handleMessage, setHandleMessage] = useState<string>("");

  // 핸들 실시간 검사
  useEffect(() => {
    // 아무것도 입력 안 했을 때
    if (!handle) {
      setHandleStatus("idle");
      setHandleMessage("");
      return;
    }

    // 패턴 검증
    if (!HANDLE_REGEX.test(handle)) {
      setHandleStatus("invalid");
      setHandleMessage("알파벳, 숫자, 밑줄(_)만 사용할 수 있습니다.");
      return;
    }

    // 여기까지 오면 형식은 유효 → 중복 검사 시작
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

        // 응답이 늦게 온 경우를 대비해, 현재 handle과 응답의 handle이 다르면 무시해도 됨
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
    }, 400); // 400ms 디바운스

    return () => {
      clearTimeout(timeoutId);
      controller.abort();
    };
  }, [handle]);

  const isHandleError =
    handleStatus === "invalid" ||
    handleStatus === "taken" ||
    handleStatus === "error";

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
          <form>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="name">이름</FieldLabel>
                <Input id="name" type="text" placeholder="홍길동" required />
              </Field>

              <Field>
                <FieldLabel htmlFor="handle">핸들</FieldLabel>
                <Input
                  id="handle"
                  type="text"
                  placeholder="yourhandle"
                  value={handle}
                  onChange={(e) => setHandle(e.target.value)}
                  required
                  aria-invalid={isHandleError}
                  className={cn(
                    isHandleError &&
                      "border-destructive focus-visible:ring-destructive"
                  )}
                />
                <FieldDescription
                  className={cn(isHandleError && "text-destructive")}
                >
                  {handleMessage ||
                    "변경 불가 · 알파벳/숫자/밑줄(_)만 허용됩니다."}
                </FieldDescription>
              </Field>

              <Field>
                <FieldLabel htmlFor="email">이메일</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  defaultValue={defaultEmail}
                  required
                />
              </Field>

              <Field>
                <Field className="grid grid-cols-2 gap-4">
                  <Field>
                    <FieldLabel htmlFor="password">비밀번호</FieldLabel>
                    <Input id="password" type="password" required />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="confirm-password">
                      비밀번호 확인
                    </FieldLabel>
                    <Input id="confirm-password" type="password" required />
                  </Field>
                </Field>
                <FieldDescription>최소 8자 이상이어야 합니다.</FieldDescription>
              </Field>

              <Field>
                <Button type="submit">계정 만들기</Button>
                <FieldDescription className="text-center">
                  이미 계정이 있으신가요? <Link href="/login">로그인</Link>
                </FieldDescription>
              </Field>
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
