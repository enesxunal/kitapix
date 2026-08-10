import { signOut } from "@/lib/auth/actions";
import { Button } from "@/components/ui/Button";

type LogoutButtonProps = {
  className?: string;
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "secondary" | "ghost";
  label?: string;
};

export function LogoutButton({
  className,
  size = "sm",
  variant = "secondary",
  label = "Çıkış Yap",
}: LogoutButtonProps) {
  return (
    <form action={signOut}>
      <Button type="submit" variant={variant} size={size} className={className}>
        {label}
      </Button>
    </form>
  );
}
