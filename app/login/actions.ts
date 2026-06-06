"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

export async function login(formData: FormData) {
  const supabase = await createClient();

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    redirect("/login?error=true&message=" + encodeURIComponent(error.message));
  }

  revalidatePath("/", "layout");
  redirect("/");
}

export async function signup(formData: FormData) {
  const supabase = await createClient();

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const { error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    redirect("/login?error=true&message=" + encodeURIComponent(error.message));
  }

  // To test email confirmation turned off, we redirect to login directly
  // Or just back to login with a success message for email verification if it is ON
  redirect("/login?success=true&message=" + encodeURIComponent("회원가입이 완료되었습니다. 이메일을 확인하거나 로그인해주세요."));
}
