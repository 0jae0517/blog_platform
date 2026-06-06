import LoginForm from "./LoginForm";
import styles from "./login.module.css";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const error = params.error === "true";
  const success = params.success === "true";
  const message = params.message as string;

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.header}>
          <h1 className={styles.title}>0_Log</h1>
          <p className={styles.subtitle}>Sign in to your workspace</p>
        </div>

        {error && (
          <div className={styles.error}>
            {message || "Authentication failed."}
          </div>
        )}
        {success && (
          <div className={styles.success}>
            {message || "Action successful."}
          </div>
        )}

        <LoginForm />
      </div>
    </div>
  );
}
