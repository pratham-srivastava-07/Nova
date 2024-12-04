import SignIn from "@/pages/Signin/Signin";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function SigninPage() {
    const session = await getServerSession()

    if(session) redirect('/')
    return <div>
        <SignIn />
    </div>
}