import path from 'path';
import fs from 'fs';
import ReactMarkdown from 'react-markdown';

export const getStaticProps = async () => {
  const markdown = fs.readFileSync(
    path.join(process.cwd(), '/public/md/privacy.md'),
    'utf8',
  );
  return {
    props: { markdown },
  };
};
const Privacy = ({ markdown }: { markdown: string }) => {
  return (
    <div className="container mx-auto rounded-full">
      <h1 className="text-center text-3xl py-5">Privacy Policy</h1>
      <div className="border-t py-10 border-gray-200 markdown">
        {/* @ts-ignore */}
        <ReactMarkdown>{markdown}</ReactMarkdown>
      </div>
    </div>
  )
}

export default Privacy