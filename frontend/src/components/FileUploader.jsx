import { useNavigate } from "react-router-dom";

function FileUploader() {
  const navigate = useNavigate();

  const handleUpload = () => {
    // For now just navigate to results
    navigate("/results");
  };

  return (
    <div className="upload-box">
      <input type="file" />
      <button onClick={handleUpload}>Analyze Agreement</button>
    </div>
  );
}

export default FileUploader;
