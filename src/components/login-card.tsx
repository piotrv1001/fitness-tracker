import CardWrapper from "@/components/card-wrapper";
import GoogleLoginForm from "@/components/google-login-form";

export default function LoginCard() {
  return (
    <CardWrapper
      title="Login"
      description="Login with your Google account to access the dashboard."
    >
      <div className="gap-y-4 items-center flex flex-col">
        <GoogleLoginForm />
      </div>
    </CardWrapper>
  );
}
