import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const path = "/";

    const serverBuildTime = new Date().toTimeString();
    console.log(`Server revalidation triggered at: ${serverBuildTime}`);

    revalidatePath(path);

    return NextResponse.json({
      revalidated: true,
      serverBuildTime,
      message: "Path revalidated successfully",
    });
  } catch (err) {
    console.error("Error during revalidation:", err);
    return NextResponse.json(
      {
        error: "Error revalidating page",
        message: err.message,
      },
      { status: 500 }
    );
  }
}
