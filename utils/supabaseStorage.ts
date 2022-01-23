// storage の key から bucket 名を取り除く
export const removeBucketPath = (key: string, bucketName: string) => {
    return key.slice(bucketName.length + 1) // "/"の分だけ加算している
  }
  