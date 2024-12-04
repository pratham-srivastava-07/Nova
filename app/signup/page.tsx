import Signup from "@/pages/Signup";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function SignupPage() {
    const session = await getServerSession()

    if(session) redirect("/")

    return <div>
        <Signup />
    </div>
}