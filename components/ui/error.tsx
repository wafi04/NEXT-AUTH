export function ErrorComponents({ error }: { error: Error | string }) {
  return (
    <div className='flex justify-center items-center min-h-[400px] text-red-500'>
      Error: {typeof error === "string" ? error : error.message}
    </div>
  );
}
