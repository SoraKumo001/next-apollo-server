import { gql, useMutation, useQuery } from '@apollo/client';

// Date retrieval
const QUERY = gql`
  query date {
    date
  }
`;

// Uploading files
const UPLOAD = gql`
  mutation Upload($file: Upload!) {
    upload(file: $file) {
      name
      type
      value
    }
  }
`;

const Page = () => {
  const { data, refetch } = useQuery(QUERY);
  const [upload, { data: file }] = useMutation(UPLOAD);
  return (
    <>
      <a target="_blank" href="https://github.com/SoraKumo001/next-apollo-server" rel="noreferrer">
        Source code
      </a>
      <hr />
      {/* SSRedacted data can be updated by refetch. */}
      <button onClick={() => refetch()}>Update date</button>
      {
        /* Dates are output as SSR. */
        data?.date && new Date(data.date).toLocaleString('en-US', { timeZone: 'UTC' })
      }
      {/* File upload sample from here down. */}
      <div
        style={{
          height: '100px',
          width: '100px',
          background: 'lightgray',
          marginTop: '8px',
          padding: '8px',
        }}
        onDragOver={(e) => {
          e.preventDefault();
        }}
        onDrop={(e) => {
          const file = e.dataTransfer.files[0];
          if (file) {
            upload({ variables: { file } });
          }
          e.preventDefault();
        }}
      >
        Upload Area
      </div>
      {/* Display of information on returned file data to check upload operation. */}
      {file && <pre>{JSON.stringify(file, undefined, '  ')}</pre>}
    </>
  );
};

export default Page;
