'use client';

import { TextField, Button, Box, Checkbox, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import React, { useState, useEffect } from 'react';
import schemaTemplate from 'src/codetemplates/base/schema';
import mappingsTemplate from 'src/codetemplates/base/mappings';
import dynamodbTemplate from 'src/codetemplates/base/lambda/dynamodb';
import typesTemplate from 'src/codetemplates/base/lambda/types';
import vtlCreateReqTemplate from 'src/codetemplates/base/vtl/create/req';
import vtlGetReqTemplate from 'src/codetemplates/base/vtl/get/req';
import vtlGetAllReqTemplate from 'src/codetemplates/base/vtl/getAll/req';
import vtlUpdateReqTemplate from 'src/codetemplates/base/vtl/update/req';
import vtlDeleteReqTemplate from 'src/codetemplates/base/vtl/delete/req';
import vtlResTemplate from 'src/codetemplates/base/vtl/get/req';
import vtlGetAllResTemplate from 'src/codetemplates/base/vtl/getAll/res';
import _ from 'lodash';
import Prism from 'prismjs';
import "prismjs/themes/prism-tomorrow.css";

export default function APIVIew() {
  // TODO: HH: Turn dataPattern into a nice ui instead of just a textarea
  const [data, setData] = useState({
    name: "Instructor", hash: "#I#", dataPatternFields: `id: string;
firstName: string;
lastName: string;
email: string;`, tenantId: true, limit: "20"
  });

  const [templateData, setTemplateData] = useState({});
  const [compiledTemplates, setCompiledTemplates] = useState([]);

  // TODO: HH: Only the lamdba templates are currently correct, teh vtls, and schema are not done yet

  // Vtl is not supported atm, javascript colours look decent
  const activeTemplates = [
    { name: "base/schema", value: schemaTemplate, language: "javascript" },
    { name: "base/mappings", value: mappingsTemplate, language: "javascript" },
    { name: "base/lambda/dynamodb", value: dynamodbTemplate, language: "javascript" },
    { name: "base/lambda/types", value: typesTemplate, language: "javascript" },
    { name: "base/vtl/create/req", value: vtlCreateReqTemplate, language: "javascript" },
    { name: "base/vtl/create/res", value: vtlResTemplate, language: "javascript" },
    { name: "base/vtl/get/req", value: vtlGetReqTemplate, language: "javascript" },
    { name: "base/vtl/get/res", value: vtlResTemplate, language: "javascript" },
    { name: "base/vtl/getAll/req", value: vtlGetAllReqTemplate, language: "javascript" },
    { name: "base/vtl/getAll/res", value: vtlGetAllResTemplate, language: "javascript" },
    { name: "base/vtl/update/req", value: vtlUpdateReqTemplate, language: "javascript" },
    { name: "base/vtl/update/res", value: vtlResTemplate, language: "javascript" },
    { name: "base/vtl/delete/req", value: vtlDeleteReqTemplate, language: "javascript" },
    { name: "base/vtl/delete/res", value: vtlResTemplate, language: "javascript" }
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
          if (templateData[templateDataField]) {
            // if field is truthy keep the string to the right
            compiledTemplate = compiledTemplate.replace(templateStatement, templateDataInsert);
          } else {
            // if field is falsy remove the string
            compiledTemplate = compiledTemplate.replace(templateStatement, "");
          }
        })
      }
      return { name, value: compiledTemplate, language };
    })
    setCompiledTemplates(compiledTemplates);
  }

  return (<React.Fragment>
    <h1>API</h1>
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
            expandIcon={<ExpandMoreIcon />}
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
