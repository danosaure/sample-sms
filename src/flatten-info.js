import path from 'path';

const flattenInfo = (filespace) => {
  if (Array.isArray(filespace)) {
    const [folder, subFilespace] = filespace;
    return path.join(path.basename(folder), flattenInfo(subFilespace));
  }

  if (typeof filespace === 'string') {
    return path.basename(filespace);
  }

  return '';
};

export default flattenInfo;
