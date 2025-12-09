"use client";

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
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">회원가입하기</CardTitle>
          <CardDescription>
            간단한 정보 입력으로 회원가입을 완료하세요.
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
                    <FieldLabel htmlFor="password">패스워드</FieldLabel>
                    <Input id="password" type="password" required />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="confirm-password">
                      패스워드 확인
                    </FieldLabel>
                    <Input id="confirm-password" type="password" required />
                  </Field>
                </Field>
                <FieldDescription>
                  패스워드는 최소 8자 이상이어야 합니다.
                </FieldDescription>
              </Field>
              <Field>
                <Button type="submit">계정 생성</Button>
                <FieldDescription className="text-center">
                  이미 계정이 있으신가요? <a href="/login">로그인</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
      <FieldDescription className="px-6 text-center">
        계속 진행하면, <a href="#">서비스 이용약관</a>과{" "}
        <a href="#">개인정보 처리방침</a>에 동의하는 것으로 간주됩니다.
      </FieldDescription>
    </div>
  );
}
