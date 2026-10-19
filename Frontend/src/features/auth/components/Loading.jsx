import './loading.scss'

const Loading = () => {
  return (
     <main className="loading-page">
      <div className="loading-card">
        <div className="spinner"></div>
        <h1>Loading....</h1>

        {/* <h1>Generating Interview Report</h1> */}

        {/* <p>
          Analyzing resume, matching skills with job description,
          and preparing personalized interview questions...
        </p> */}
      </div>
    </main>
  )
}

export default Loading