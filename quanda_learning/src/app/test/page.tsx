import TestPage from "@/components/test/TestPage";

export default function Page({ params }: { params: { testId: string } }) {
  return <TestPage testId={Number(params.testId)} />;
}
