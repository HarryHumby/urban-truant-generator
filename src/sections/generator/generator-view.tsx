'use client';

import { TextField, Button, Box, Checkbox, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import React, { useState, useEffect } from 'react';
import apiBaseSchemaTemplate from 'src/codetemplates/api/base/schema';
import apiBaseMappingsTemplate from 'src/codetemplates/api/base/mappings';
import apiBaseDynamodbTemplate from 'src/codetemplates/api/base/lambda/dynamodb';
import apiBaseTypesTemplate from 'src/codetemplates/api/base/lambda/types';
import apiBaseVtlCreateReqTemplate from 'src/codetemplates/api/base/vtl/create/req';
import apiBaseVtlGetReqTemplate from 'src/codetemplates/api/base/vtl/get/req';
import apiBaseVtlGetAllReqTemplate from 'src/codetemplates/api/base/vtl/getAll/req';
import apiBaseVtlUpdateReqTemplate from 'src/codetemplates/api/base/vtl/update/req';
import apiBaseVtlDeleteReqTemplate from 'src/codetemplates/api/base/vtl/delete/req';
import apiBaseVtlResTemplate from 'src/codetemplates/api/base/vtl/get/req';
import apiBaseVtlGetAllResTemplate from 'src/codetemplates/api/base/vtl/getAll/res';
import uiBaseGraphQLTemplate from 'src/codetemplates/ui/base/graphql';
import uiBaseIndexTemplate from 'src/codetemplates/ui/base/index';
import uiBaseTypesTemplate from 'src/codetemplates/ui/base/types';
import uiClientTemplate from 'src/codetemplates/ui/client';
import uiIndexTemplate from 'src/codetemplates/ui/index';
import _ from 'lodash';
import Prism from 'prismjs';
import "prismjs/themes/prism-tomorrow.css";

export default function GeneratorVIew() {
  // TODO: HH: Turn dataPattern into a nice ui instead of just a textarea
  const [data, setData] = useState({
    name: "Instructor", hash: "#I#", dataPatternFields: `id: string;
firstName: string;
lastName: string;
email: string;`, tenantId: true, limit: "20"
  });

  const [templateData, setTemplateData] = useState({});
  const [compiledTemplates, setCompiledTemplates] = useState([]);

  // Vtl is not supported atm, javascript colours look decent
  const activeTemplates = [
    { name: "api/base/schema", value: apiBaseSchemaTemplate, language: "javascript" },
    { name: "api/base/mappings", value: apiBaseMappingsTemplate, language: "javascript" },
    { name: "api/base/lambda/dynamodb", value: apiBaseDynamodbTemplate, language: "javascript" },
    { name: "api/base/lambda/types", value: apiBaseTypesTemplate, language: "javascript" },
    { name: "api/base/vtl/create/req", value: apiBaseVtlCreateReqTemplate, language: "javascript" },
    { name: "api/base/vtl/create/res", value: apiBaseVtlResTemplate, language: "javascript" },
    { name: "api/base/vtl/get/req", value: apiBaseVtlGetReqTemplate, language: "javascript" },
    { name: "api/base/vtl/get/res", value: apiBaseVtlResTemplate, language: "javascript" },
    { name: "api/base/vtl/getAll/req", value: apiBaseVtlGetAllReqTemplate, language: "javascript" },
    { name: "api/base/vtl/getAll/res", value: apiBaseVtlGetAllResTemplate, language: "javascript" },
    { name: "api/base/vtl/update/req", value: apiBaseVtlUpdateReqTemplate, language: "javascript" },
    { name: "api/base/vtl/update/res", value: apiBaseVtlResTemplate, language: "javascript" },
    { name: "api/base/vtl/delete/req", value: apiBaseVtlDeleteReqTemplate, language: "javascript" },
    { name: "api/base/vtl/delete/res", value: apiBaseVtlResTemplate, language: "javascript" },
    { name: "ui/services/base/graphql", value: uiBaseGraphQLTemplate, language: "javascript" },
    { name: "ui/services/base/index", value: uiBaseIndexTemplate, language: "javascript" },
    { name: "ui/services/base/types", value: uiBaseTypesTemplate, language: "javascript" },
    { name: "ui/services/client", value: uiClientTemplate, language: "javascript" },
    { name: "ui/services/index", value: uiIndexTemplate, language: "javascript" },
  ];

  const onTextChange = (e: any) => {
    let dataUpdate = { [e.target.name]: e.target.value };
    setData({ ...data, ...dataUpdate });
  }

  const onCheckboxChange = (e: any) => {
    let dataUpdate = { [e.target.name]: e.target.checked };
    setData({ ...data, ...dataUpdate });
  }

  const updateTemplateData = () => {

    const newTemplateData: any = {};
    newTemplateData["camelCaseName"] = _.camelCase(data.name);
    newTemplateData["pascalCaseName"] = _.capitalize(_.camelCase(data.name));
    newTemplateData["upperCaseName"] = data.name.toUpperCase();
    newTemplateData["hash"] = data.hash;
    newTemplateData["tenantHash"] = data.tenantId ? "#T#" : "";
    newTemplateData["tenantId"] = data.tenantId ? "${tenantId}" : "";
    newTemplateData["dataPatternFields"] = data.dataPatternFields;
    newTemplateData["dataPatternFieldsCreate"] = data.dataPatternFields.replace("id: string;\n", "");
    newTemplateData["dataPatternFieldsUpdate"] = data.dataPatternFields.replaceAll(":", "?:").replaceAll("id?:", "id:");
    newTemplateData["dataPatternFieldsGraphQL"] = data.dataPatternFields.replaceAll("string;", "String").replaceAll("boolean;", "Boolean");
    newTemplateData["dataPatternFieldsGraphQLCreate"] = data.dataPatternFields.replaceAll("string;", "String").replaceAll("boolean;", "Boolean").replace("id: String", "id: String!");
    newTemplateData["dataPatternFieldsGraphQLUpdate"] = data.dataPatternFields.replaceAll("string;", "String").replaceAll("boolean;", "Boolean").replace("id: String", "id: String!");
    newTemplateData["dataPatternFieldsGraphQLGet"] = "id: String!";
    newTemplateData["dataPatternFieldsGraphQLDelete"] = "id: String!";
    newTemplateData["dataPatternFieldsUIGraphQL"] = data.dataPatternFields.replaceAll(": string;", "").replaceAll(": boolean;", "Boolean");
    // TODO: Implement limit
    newTemplateData["limit"] = data.limit;
    setTemplateData(newTemplateData);
  }

  useEffect(() => {
    updateTemplateData();
  }, [data])

  useEffect(() => {
    generate();
  }, [templateData])

  useEffect(() => {
    Prism.highlightAll();
  }, [compiledTemplates])

  const download = () => {
    navigator.clipboard.writeText(compiledTemplates[compiledTemplates.length - 1]?.value);
  }

  const generate = () => {
    let compiledTemplates = activeTemplates.map((activeTemplate) => {
      const { name, value, language } = activeTemplate;
      let compiledTemplate = value;
      Object.entries(templateData).forEach((template) => {
        const [key, value] = template;
        compiledTemplate = compiledTemplate.replaceAll(`<% ${key} %>`, value);
      })
      const templateStatements = compiledTemplate.match(/<% if .* %>/g);
      if (templateStatements && templateStatements.length) {
        templateStatements.forEach((templateStatement) => {
          const splitTemplateStatement = templateStatement.split(" ");
          // remove <%,if,%>  
          splitTemplateStatement.shift();
          const statement = splitTemplateStatement.shift();
          splitTemplateStatement.pop();
          // get the field and the string to use if truthy
          const templateDataField = splitTemplateStatement.shift();
          const templateDataInsert = splitTemplateStatement.join(" ");
          if (templateDataField?.charAt(0) === "!") {
            if (templateData[templateDataField.slice(1)]) {
              // if field is truthy remove the string
              compiledTemplate = compiledTemplate.replace(templateStatement, "");
            } else {
              // if field is falsy keep the string to the right
              compiledTemplate = compiledTemplate.replace(templateStatement, templateDataInsert);
            }
          } else {
            if (templateData[templateDataField]) {
              // if field is truthy keep the string to the right
              compiledTemplate = compiledTemplate.replace(templateStatement, templateDataInsert);
            } else {
              // if field is falsy remove the string
              compiledTemplate = compiledTemplate.replace(templateStatement, "");
            }
          }
        })
      }
      // remove the blocks of linebreaks that results when removing content from the template
      compiledTemplate = compiledTemplate.replace(/\n+/g, "\n");
      return { name, value: compiledTemplate, language };
    })
    setCompiledTemplates(compiledTemplates);
  }

  return (<React.Fragment>
    <h1>Generator</h1>
    <Accordion key={"templateData"}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        id={"templateData"}
      >
        Template Data
      </AccordionSummary>
      <AccordionDetails
        id={"templateData"}
      >
        <Box sx={{ bgcolor: "primary.dark", borderRadius: 2, padding: "20px" }}>
          {Object.entries(templateData).filter((x) => { return x[1] }).map((template) => {
            const [key, value] = template;
            return <p key={key}>{key}: {value}</p>
          })}
        </Box>
      </AccordionDetails>
    </Accordion>

    <h2>Configuration</h2>
    <Box>
      <TextField label={"Name"} name={"name"} value={data.name} onChange={onTextChange}></TextField>
      <TextField label={"Hash"} name={"hash"} value={data.hash} onChange={onTextChange}></TextField>
      TenantId?: <Checkbox name={"tenantId"} checked={data.tenantId} onChange={onCheckboxChange} ></Checkbox>
      <TextField label={"Limit"} name={"limit"} value={data.limit} onChange={onTextChange}></TextField>
      <textarea value={data.dataPatternFields} name={"dataPatternFields"} onChange={onTextChange}></textarea >
    </Box>
    <h2>Preview</h2>
    <Box>
      {compiledTemplates.map((compiledTemplate) => {
        const { name, value, language } = compiledTemplate;
        return <Accordion key={name}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            id={name}
          >
            {name}
          </AccordionSummary>
          <AccordionDetails
            id={name}
          >
            <pre><code className={`language-${language}`}>{value}</code></pre>
          </AccordionDetails>
        </Accordion>
      })}
    </Box>
    <Button onClick={download}>Download</Button>
  </React.Fragment>
  );
}
