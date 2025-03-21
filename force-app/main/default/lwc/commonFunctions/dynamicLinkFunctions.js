import getObjectIdFromQuery from "@salesforce/apex/DynamicLinkHelper.getObjectIdFromQuery";
import getDynamicLinkByIdentity from "@salesforce/apex/DynamicLinkHelper.getDynamicLinkByIdentity";
import getRecordIdFromDynamicLinkType from "@salesforce/apex/DynamicLinkHelper.getRecordIdFromDynamicLinkType";
import getSiteUrl from "@salesforce/apex/DynamicLinkHelper.getSiteUrl";
import getSetupPageLink from "@salesforce/apex/DynamicLinkHelper.getSetupPageLink";

const getPageReferenceByDynamicType = async (dynamicLink) => {
  var pageReference;
  switch (dynamicLink.RecordType.DeveloperName) {
    case "NamedPage":
      pageReference = {
        type: "standard__app",
        attributes: {
          appTarget: dynamicLink.App_API_Name__c,
          pageRef: {
            type: "standard__namedPage",
            attributes: {
              pageName: dynamicLink.Page_Name__c
            }
          }
        }
      };
      break;
    case "APINamePage":
      pageReference = {
        type: "standard__app",
        attributes: {
          appTarget: dynamicLink.App_API_Name__c,
          pageRef: {
            type: "standard__navItemPage",
            attributes: {
              apiName: dynamicLink.Page_Name__c
            }
          }
        }
      };
      break;
    case "AppPage":
      pageReference = {
        type: "standard__app",
        attributes: {
          appTarget: dynamicLink.App_API_Name__c
        }
      };
      break;
    case "ObjectPage":
      pageReference = {
        type: "standard__app",
        attributes: {
          appTarget: dynamicLink.App_API_Name__c,
          pageRef: {
            type: "standard__objectPage",
            attributes: {
              objectApiName: dynamicLink.Object__c,
              actionName: "list"
            }
          }
        }
      };
      if (dynamicLink.Filter_Name__c) {
        pageReference.attributes.pageRef.state = {
          filterName: dynamicLink.Filter_Name__c
        };
      }
      break;
    case "RecordPage":
      // execute select query and get the id
      const SELECTQUERYRESULT = await getObjectIdFromQuery({
        objectAPIName: dynamicLink.Object__c,
        whereCondition: dynamicLink.Where_Condition__c
      });
      // get the id from the result
      const objectId = SELECTQUERYRESULT[0].Id;

      pageReference = {
        type: "standard__app",
        attributes: {
          appTarget: dynamicLink.App_API_Name__c,
          pageRef: {
            type: "standard__recordPage",
            attributes: {
              objectApiName: dynamicLink.Object__c,
              actionName: "view",
              recordId: objectId
            }
          }
        }
      };
      break;
    case "RecordRelationshipPage":
      // execute select query and get the id
      const SELECTRESULT = await getObjectIdFromQuery({
        objectAPIName: dynamicLink.Object__c,
        whereCondition: dynamicLink.Where_Condition__c
      });
      // get the id from the result
      const objectResultId = SELECTRESULT[0].Id;

      pageReference = {
        type: "standard__app",
        attributes: {
          appTarget: dynamicLink.App_API_Name__c,
          pageRef: {
            type: "standard__recordRelationshipPage",
            attributes: {
              objectApiName: dynamicLink.Object__c,
              actionName: "view",
              recordId: objectResultId,
              relationshipApiName: dynamicLink.Relationship_API_Name__c
            }
          }
        }
      };
      break;
    case "WebPage":
      pageReference = {
        type: "standard__webPage",
        attributes: {
          url: dynamicLink.Link__c
        }
      };
      break;
    case "CommunityPage":
      const communityPage = await getRecordIdFromDynamicLinkType({
        dyanmicLinkType: dynamicLink.RecordType.DeveloperName,
        whereCondition: "Name='" + dynamicLink.Site_Name__c + "'"
      });
      let siteUrl = await getSiteUrl({
        networkId: communityPage[0].Id
      });
      if (dynamicLink.Relative_Url__c) {
        siteUrl += dynamicLink.Relative_Url__c;
      }
      pageReference = {
        type: "standard__webPage",
        attributes: {
          url: siteUrl
        }
      };
      break;
    case "InAppDetailsPage":
      pageReference = {
        type: "standard__app",
        attributes: {
          appTarget: "c__Learning_Home",
          pageRef: {
            type: "standard__navItemPage",
            attributes: {
              apiName: "Learning_Application_Details_Page"
            }
          }
        }
      };
      break;
    case "SurveyRecordPage":
      const survey = await getRecordIdFromDynamicLinkType({
        dyanmicLinkType: dynamicLink.RecordType.DeveloperName,
        whereCondition: dynamicLink.Where_Condition__c
      });
      pageReference = {
        type: "standard__webPage",
        attributes: {
          url: "/survey/builderApp.app?surveyId=" + survey[0].Id
        }
      };
      break;
    case "DPERecordPage":
      const dpeRecord = await getRecordIdFromDynamicLinkType({
        dyanmicLinkType: dynamicLink.RecordType.DeveloperName,
        whereCondition: dynamicLink.Where_Condition__c
      });
      pageReference = {
        type: "standard__webPage",
        attributes: {
          url:
            "/builder_industries_dataprocessingengine/dataProcessingEngine.app?dataProcessingEngineId=" +
            dpeRecord[0].Id
        }
      };
      break;
    case "FlowRecordPage":
      const flowActiveVersion = await getRecordIdFromDynamicLinkType({
        dyanmicLinkType: dynamicLink.RecordType.DeveloperName,
        whereCondition: dynamicLink.Where_Condition__c
      });
      pageReference = {
        type: "standard__webPage",
        attributes: {
          url:
            "/builder_platform_interaction/flowBuilder.app?flowId=" +
            flowActiveVersion[0].ActiveVersionId
        }
      };
      break;
    case "SetupPage":
      const records = await getObjectIdFromQuery({
        objectAPIName: dynamicLink.Setup_Page__c,
        whereCondition: dynamicLink.Where_Condition__c
      });
      const setupPage = await getSetupPageLink({
        objectAPIName: dynamicLink.Setup_Page__c,
        record: records[0].Id
      });

      pageReference = {
        type: "standard__webPage",
        attributes: {
          url: setupPage
        }
      };
      break;
    default:
      pageReference = {
        type: "standard__webPage",
        attributes: {
          url: dynamicLink.Link__c
        }
      };
      break;
  }
  if (dynamicLink.Page__c != null && dynamicLink.Page__c !== undefined) {
    pageReference.attributes.pageRef.state = {
      c__pageId: dynamicLink.Page__c
    };
  }
  return pageReference;
};

const getDynamicLinkByIdentifier = async (identifier) => {
  const SELECTQUERYRESULT = await getDynamicLinkByIdentity({
    identifier: identifier
  });
  return SELECTQUERYRESULT;
};

const findDynamicLinkIdentifier = (input, middlePosition) => {
  var spacePosition = middlePosition;
  //Check for character which is non-capital alphabet or underscore
  for (
    ;
    ((input.charCodeAt(spacePosition) >= 65 &&
      input.charCodeAt(spacePosition) <= 90) ||
      input.charCodeAt(spacePosition) == 95) != " ";
    spacePosition--
  ) {}

  return input.substring(spacePosition + 1, middlePosition + 8);
};
export {
  getDynamicLinkByIdentifier,
  getPageReferenceByDynamicType,
  findDynamicLinkIdentifier
};