import User from "@/database/user.model";
import { connectToDatabase } from "@/lib/mongoose";
import { NextResponse } from "next/server"

export async function POST(req: Request, res: Response){
  try {
    await connectToDatabase()
    const {searchParams} = new URL(req.url)

    const step = searchParams.get('step')

    if(step === '1'){
      const {email} = await req.json();
      const isExistingUser = await User.findOne({ email})

      if(isExistingUser){
        return NextResponse.json(
        { error: 'Email already exists'},
        {status: 400})
      }

      return NextResponse.json({success: true})
    } else if(step === '2'){
      const {email, username, name, password} = await req.json();

      const isExistUsername = await User.findOne({username: username})
      if(isExistUsername){
        return NextResponse.json(
        { error: "Username already exists"},
        {status: 400}
        );
      {

    }

  }
    }
} catch(error) {
    const result = error as Error
    return NextResponse.json({ error: result.message}, {status: 400});
  }
}