"use client";
import {
  FileArray,
  FileBrowser,
  FileContextMenu,
  FileActionHandler,
  FileList,
  FileNavbar,
  FileToolbar,
  ChonkyActions,
} from "chonky";
import { defineFileAction, FileData } from "chonky";
import { Nullable } from "tsdef";
const SortFilesBySize = defineFileAction({
  id: "sort_files_by_size",
  sortKeySelector: (file: Nullable<FileData>) => (file ? file.size : undefined),
  button: {
    name: "Sort by sizerr",
    toolbar: true,
    group: "Options",
    contextMenu: true,
  },
} as const);
import { useCallback } from "react";
import { setChonkyDefaults } from "chonky";
import { ChonkyIconFA } from "chonky-icon-fontawesome";
setChonkyDefaults({ iconComponent: ChonkyIconFA });
export const AppFileBrowser = () => {
  const files: FileArray = [
    { id: "abD3", name: "README.txt" },
    { id: "abD4", name: "audio.mp3" },
    { id: "abD5", name: "video.mp4" },
    null,
  ];
  const folderChain = [{ id: "xcv", name: "Demo", isDir: true }];
  const myFileActions = [
    SortFilesBySize,
    ChonkyActions.UploadFiles,
    ChonkyActions.DownloadFiles,
    ChonkyActions.DeleteFiles,
    ChonkyActions.CopyFiles,
    ChonkyActions.CreateFolder,
    ChonkyActions.EndDragNDrop,
    ChonkyActions.FocusSearchInput,
    ChonkyActions.MoveFiles,
    ChonkyActions.OpenFileContextMenu,
    ChonkyActions.OpenParentFolder,
    ChonkyActions.SortFilesByDate,
    ChonkyActions.SortFilesByName,
    ChonkyActions.SortFilesBySize,
    ChonkyActions.UploadFiles,
    ChonkyActions.CreateFolder,
  ];
  const handleAction = useCallback<FileActionHandler>((data) => {
    console.log("File action data:", data);
  }, []);
  return (
    <FileBrowser
      files={files}
      folderChain={folderChain}
      fileActions={myFileActions}
      onFileAction={handleAction}
    >
      <FileNavbar />
      <FileToolbar />
      <FileList />
      <FileContextMenu />
    </FileBrowser>
  );
};
