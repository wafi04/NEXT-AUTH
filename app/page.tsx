import CheckUser from "@/features/auth/components/CheckUSer";
import { currentUser } from "@/features/auth/data";

export default async function Home() {
  const data = await currentUser();
  console.log(data);
  return (
    <div className="flex flex-col">
      {data?.role}
      <CheckUser />
    </div>
  );
}
