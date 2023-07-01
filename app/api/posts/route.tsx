import { NextResponse } from 'next/server';

import getCurrentUser from '@/app/actions/getCurrentUser';
import prisma from '@/app/libs/prismadb';

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser?.isAdmin) {
    return NextResponse.error();
  }

  const body = await request.json();
  const { title, content } = body;

  Object.keys(body).forEach((value: any) => {
    if (!body[value]) {
      NextResponse.error();
    }
  });

  const blogPost = await prisma.blogPost.create({
    data: {
      title,
      content,
      userId: currentUser.id,
    },
  });

  return NextResponse.json(blogPost);
}
