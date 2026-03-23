import { SignalsSubNav } from "@/components/signals/SignalsSubNav";

export default function SignalsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <SignalsSubNav />
      {children}
    </div>
  );
}
