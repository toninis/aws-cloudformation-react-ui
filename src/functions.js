export function generateAWSurl(stackID) {
  const baseUrl =
    "https://eu-west-2.console.aws.amazon.com/cloudformation/home?region=eu-west-2#/stacks/";
  let newStackID = encodeURIComponent(stackID);
  return baseUrl + newStackID + "/overview";
}
