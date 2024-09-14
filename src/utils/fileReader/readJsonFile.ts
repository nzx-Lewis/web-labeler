export default (file: File): Promise<unknown> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = (e: ProgressEvent<FileReader>) => {
      try {
        const content = JSON.parse(e?.target?.result as string);
        resolve(content);
      } catch (err) {
        reject(err);
      }
    };
  });
};
