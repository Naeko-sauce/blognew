 function ContentDisplay({ frontmatter, content }) {
    return (
      <div>
        <h1>{frontmatter.title}</h1>
        <p>{frontmatter.description}</p>
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </div>
    );
  }
  
  export default ContentDisplay;