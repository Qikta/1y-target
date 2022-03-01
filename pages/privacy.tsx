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
    <div className="container mx-auto">
      <div className="mb-8">
        <div className="flex flex-wrap -mb-px" id="myTab" data-tabs-toggle="#myTabContent" role="tablist">
            <a className="mr-2" role="presentation" href={'/terms'}>
                <button className="inline-block text-gray-500 hover:text-gray-600 hover:border-gray-300 rounded-t-lg py-4 px-4 text-sm font-medium text-center border-transparent border-b-2 dark:text-gray-400 dark:hover:text-gray-300" id="profile-tab" data-tabs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="false">Terms</button>
            </a>
            <a className="mr-2" role="presentation" href={'/privacy'}>
                <button className="inline-block text-gray-500 hover:text-gray-600 hover:border-gray-300 rounded-t-lg py-4 px-4 text-sm font-medium text-center border-transparent border-b-2 dark:text-gray-400 dark:hover:text-gray-300 active" id="dashboard-tab" data-tabs-target="#dashboard" type="button" role="tab" aria-controls="dashboard" aria-selected="true">
                  Privacy
                </button>
            </a>
        </div>
      </div>
      <div className='rounded-md p-5 my-5 bg-gray-100'>
        <h1 className="text-center text-3xl py-5">Privacy Policy</h1>
        <div className="border-t py-10 border-gray-200 markdown">
          {/* @ts-ignore */}
          <ReactMarkdown>{markdown}</ReactMarkdown>
        </div>
      </div>
    </div>
  )
}

export default Privacy