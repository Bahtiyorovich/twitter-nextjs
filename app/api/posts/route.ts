import {NextResponse} from 'next/server'
import { connectToDatabase } from '@/lib/mongoose';
import Post from '@/models/post.model';
import User from '@/models/user.model';

export async function POST(req: Request){
  try {
    await connectToDatabase();
    const {body, userId} = await req.json();
    const post = await Post.create({body, user: userId})
    return NextResponse.json(post)
  } catch (error) {
    const result = error as Error;
    return NextResponse.json({error: result.message}, {status: 400})
  }
}

export async function GET(req: Request){
  try {
    await connectToDatabase();
    const {searchParams} = new URL(req.url);
    const limit = searchParams.get('limit');

    const posts = await Post.find({})
      .populate({
        path: "user",
        model: User,
        select: "name email profileImage _id username"
      })
      .limit(Number(limit))
      .sort({createdAt: -1})

      return NextResponse.json(posts)
  } catch (error) {
    const result = error as Error 
    return NextResponse.json({error: result.message}, {status:400})
  }
}

export async function DELETE(req: Request){
  try {
    await connectToDatabase();
    const {postId, userId} = await req.json();
    await Post.findByIdAndRemove(postId);

    return NextResponse.json({message: 'Post deleted successfully'})
  } catch (error) {
    const result = error as Error
    return NextResponse.json({error: result.message}, {status:400});
  }
}