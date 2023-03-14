const getUrlAws = (key: string) => {
    return `https://${process.env.REACT_APP_AWSBUCKET}.s3.${process.env.REACT_APP_AWSREGION}.amazonaws.com/${key}`
}

export default getUrlAws
