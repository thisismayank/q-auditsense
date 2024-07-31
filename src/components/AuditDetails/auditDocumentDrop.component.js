import {
  Dropzone,
  FileMosaic,
  FullScreen,
  ImagePreview,
  VideoPreview,
} from "@files-ui/react";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { uploadAuditReport } from "../../reducers/audit.reducer";
import { selectFilesUploadedIds } from "../../selectors/misc.selector";
import Snackbar from "@mui/material/Snackbar";
import { setFilesUploadedIds } from "../../reducers/misc.reducer";
const BASE_URL = "https://www.myserver.com";
const AuditDocumentDrop = ({ organisationId, supplierId, factoryId }) => {
  const [extFiles, setExtFiles] = React.useState([]);
  const [imageSrc, setImageSrc] = React.useState(undefined);
  const [videoSrc, setVideoSrc] = React.useState(undefined);
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const dispatch = useDispatch();

  const filesUploadedIds = useSelector(selectFilesUploadedIds);
  React.useEffect(() => {
    if (Object.keys(filesUploadedIds).length > 0) {
      let successfulIds = Object.keys(filesUploadedIds).filter(
        (x) => filesUploadedIds[x] === true
      );
      setMessage(
        `${successfulIds.length} ${
          successfulIds.length > 1 ? "files" : "file"
        } uploaded successfully, ${
          successfulIds.length > 1 ? "they have" : "it has"
        } been removed from the dropbox.`
      );
      setOpen(true);
      setExtFiles(extFiles.filter((x) => !filesUploadedIds[x.id]));
      dispatch(setFilesUploadedIds({}));
    }
  }, [filesUploadedIds]);
  const updateFiles = (incommingFiles) => {
    console.log("incomming files", incommingFiles);
    setExtFiles(incommingFiles);
  };
  const onDelete = (id) => {
    setExtFiles(extFiles.filter((x) => x.id !== id));
  };
  const handleSee = (imageSource) => {
    setImageSrc(imageSource);
  };
  const handleWatch = (videoSource) => {
    setVideoSrc(videoSource);
  };
  const handleStart = (filesToUpload) => {
    console.log("advanced demo start upload", filesToUpload);
    dispatch(
      uploadAuditReport(
        {
          organisationId,
          supplierId,
          factoryId,
          auditId: "none",
          file: filesToUpload,
        },
        { file: filesToUpload }
      )
    );
  };
  const handleFinish = (uploadedFiles) => {
    console.log("advanced demo finish upload", uploadedFiles);
  };
  const handleAbort = (id) => {
    setExtFiles(
      extFiles.map((ef) => {
        if (ef.id === id) {
          return { ...ef, uploadStatus: "aborted" };
        } else return { ...ef };
      })
    );
  };
  const handleCancel = (id) => {
    setExtFiles(
      extFiles.map((ef) => {
        if (ef.id === id) {
          return { ...ef, uploadStatus: undefined };
        } else return { ...ef };
      })
    );
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  return (
    <>
      <Dropzone
        onChange={updateFiles}
        minHeight="400px"
        value={extFiles}
        label="Drag'n drop files here or click to browse"
        // uploadConfig={{
        //   url: BASE_URL + "/file",
        //   cleanOnUpload: true,
        // }}
        onUploadStart={handleStart}
        onUploadFinish={handleFinish}
        actionButtons={{
          position: "after",
          abortButton: {},
          deleteButton: {},
          uploadButton: {
            onClick: () => {
              handleStart(extFiles);
            },
          },
        }}
      >
        {extFiles.map((file) => (
          <FileMosaic
            {...file}
            key={file.id}
            onDelete={onDelete}
            onSee={handleSee}
            onWatch={handleWatch}
            onAbort={handleAbort}
            onCancel={handleCancel}
            resultOnTooltip
            alwaysActive
            preview
            info
          />
        ))}
      </Dropzone>
      <FullScreen
        open={imageSrc !== undefined}
        onClose={() => setImageSrc(undefined)}
      >
        <ImagePreview src={imageSrc} />
      </FullScreen>
      <FullScreen
        open={videoSrc !== undefined}
        onClose={() => setVideoSrc(undefined)}
      >
        <VideoPreview src={videoSrc} autoPlay controls />
      </FullScreen>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message={message}
      />
    </>
  );
};

export default AuditDocumentDrop;
