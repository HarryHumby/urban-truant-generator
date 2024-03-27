'use client';

import { TextField, Button, Box, Checkbox, Accordion, AccordionSummary, AccordionDetails, MenuItem, Tabs, Tab, Select, InputLabel } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import React, { useState, useEffect } from 'react';
// TODO: HH: Move these into an index and import all from one file
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
import uuidv4 from 'src/utils/uuidv4';
import JSZip from "jszip";
import { saveAs } from "file-saver";
// $TenantId_HASH_$tenantId_$prefix_
// $prefix_$id
export default function GeneratorVIew() {
  // TODO: HH: Add a save and a load entities
  const [entities, setEntities] = useState([{
    name: "Instructor",
    hash: "I",
    dataPattern: {
      fields: [{ id: uuidv4(), key: "id", type: "string" }],
      globalSecondaryIndexes: [{ id: uuidv4(), key: "GSI1", pk: ["#T#", "$tenantId", "$id"], sk: ["#I#", "$id"] }]
    },
    tenantId: true,
    limit: "20"
  }, {
    name: "Student",
    hash: "S",
    dataPattern: {
      fields: [{ id: uuidv4(), key: "id", type: "string" }],
      globalSecondaryIndexes: [{ id: uuidv4(), key: "GSI1", pk: ["$id"], sk: ["$id"] }]
    },
    tenantId: true,
    limit: "20"
  }]);

  const [templateData, setTemplateData] = useState({});
  const [compiledTemplates, setCompiledTemplates] = useState([]);
  const [currentTabIndex, setCurrentTabIndex] = useState(0);

  // TODO: HH: Move this into a seperate file
  // Vtl is not supported atm, javascript colours look decent
  const activeTemplates = [
    { name: "schema", type: "backend", path: "api/<% camelCaseName %>/base/schema.graphql", value: apiBaseSchemaTemplate, language: "javascript" },
    { name: "mappings", type: "backend", path: "api/<% camelCaseName %>/base/mappings.yml", value: apiBaseMappingsTemplate, language: "javascript" },
    { name: "lambda/dynamodb", type: "backend", path: "api/<% camelCaseName %>/base/lambda/dynamodb.ts", value: apiBaseDynamodbTemplate, language: "javascript" },
    { name: "lambda/types", type: "backend", path: "api/<% camelCaseName %>/base/lambda/types.ts", value: apiBaseTypesTemplate, language: "javascript" },
    { name: "vtl/create/req", type: "backend", path: "api/<% camelCaseName %>/base/vtl/create/req.vtl", value: apiBaseVtlCreateReqTemplate, language: "javascript" },
    { name: "vtl/create/res", type: "backend", path: "api/<% camelCaseName %>/base/vtl/create/res.vtl", value: apiBaseVtlResTemplate, language: "javascript" },
    { name: "vtl/get/req", type: "backend", path: "api/<% camelCaseName %>/base/vtl/get/req.vtl", value: apiBaseVtlGetReqTemplate, language: "javascript" },
    { name: "vtl/get/res", type: "backend", path: "api/<% camelCaseName %>/base/vtl/get/res.vtl", value: apiBaseVtlResTemplate, language: "javascript" },
    { name: "vtl/getAll/req", type: "backend", path: "api/<% camelCaseName %>/base/vtl/getAll/req.vtl", value: apiBaseVtlGetAllReqTemplate, language: "javascript" },
    { name: "vtl/getAll/res", type: "backend", path: "api/<% camelCaseName %>/base/vtl/getAll/res.vtl", value: apiBaseVtlGetAllResTemplate, language: "javascript" },
    { name: "vtl/update/req", type: "backend", path: "api/<% camelCaseName %>/base/vtl/update/req.vtl", value: apiBaseVtlUpdateReqTemplate, language: "javascript" },
    { name: "vtl/update/res", type: "backend", path: "api/<% camelCaseName %>/base/vtl/update/res.vtl", value: apiBaseVtlResTemplate, language: "javascript" },
    { name: "vtl/delete/req", type: "backend", path: "api/<% camelCaseName %>/base/vtl/delete/req.vtl", value: apiBaseVtlDeleteReqTemplate, language: "javascript" },
    { name: "vtl/delete/res", type: "backend", path: "api/<% camelCaseName %>/base/vtl/delete/res.vtl", value: apiBaseVtlResTemplate, language: "javascript" },
    { name: "services/base/graphql", type: "frontend", path: "services/<% camelCaseName %>/<% camelCaseName %>/base/graphql.ts", value: uiBaseGraphQLTemplate, language: "javascript" },
    { name: "services/base/index", type: "frontend", path: "services/<% camelCaseName %>/<% camelCaseName %>/base/index.ts", value: uiBaseIndexTemplate, language: "javascript" },
    { name: "services/base/types", type: "frontend", path: "services/<% camelCaseName %>/<% camelCaseName %>/base/types.ts", value: uiBaseTypesTemplate, language: "javascript" },
    { name: "services/client", type: "frontend", path: "services/<% camelCaseName %>/<% camelCaseName %>/client.ts", value: uiClientTemplate, language: "javascript" },
    { name: "services/index", type: "frontend", path: "services/<% camelCaseName %>/<% camelCaseName %>/index.ts", value: uiIndexTemplate, language: "javascript" },
  ];

  const updateTemplateData = () => {
    const newTemplateData: any = {};

    entities.forEach((entity) => {
      const newEntityTemplateData: any = {};
      let dataPatternFields = ``;
      entity.dataPattern.fields.forEach((field) => {
        dataPatternFields += `${field.key}: ${field.type};\n`;
      })

      // TODO: HH: Move the different types like string and boolean into its own file

      newEntityTemplateData["camelCaseName"] = _.camelCase(entity.name);
      newEntityTemplateData["pascalCaseName"] = _.capitalize(_.camelCase(entity.name));
      newEntityTemplateData["upperCaseName"] = entity.name.toUpperCase();
      newEntityTemplateData["hash"] = `#${entity.hash}#`;
      newEntityTemplateData["tenantHash"] = entity.tenantId ? "#T#" : "";
      newEntityTemplateData["tenantId"] = entity.tenantId ? "${tenantId}" : "";
      newEntityTemplateData["dataPatternFields"] = dataPatternFields;
      newEntityTemplateData["dataPatternFieldsCreate"] = dataPatternFields.replace("id: string;\n", "");
      newEntityTemplateData["dataPatternFieldsUpdate"] = dataPatternFields.replaceAll(":", "?:").replaceAll("id?:", "id:");
      newEntityTemplateData["dataPatternFieldsGraphQL"] = dataPatternFields.replaceAll("string;", "String").replaceAll("boolean;", "Boolean").replaceAll("number;", "Number");
      newEntityTemplateData["dataPatternFieldsGraphQLCreate"] = dataPatternFields.replaceAll("string;", "String").replaceAll("boolean;", "Boolean").replaceAll("number;", "Number").replace("id: String", "id: String!");
      newEntityTemplateData["dataPatternFieldsGraphQLUpdate"] = dataPatternFields.replaceAll("string;", "String").replaceAll("boolean;", "Boolean").replaceAll("number;", "Number").replace("id: String", "id: String!");
      newEntityTemplateData["dataPatternFieldsGraphQLGet"] = "id: String!";
      newEntityTemplateData["dataPatternFieldsGraphQLDelete"] = "id: String!";
      newEntityTemplateData["dataPatternFieldsUIGraphQL"] = dataPatternFields.replaceAll(": string;", "").replaceAll(": boolean;", "Boolean");
      // TODO: HH: Implement limit
      newEntityTemplateData["limit"] = entity.limit;

      newTemplateData[entity.name] = newEntityTemplateData;
    })

    setTemplateData(newTemplateData);
  }

  useEffect(() => {
    updateTemplateData();
  }, [entities])

  useEffect(() => {
    generate();
  }, [templateData])

  useEffect(() => {
    Prism.highlightAll();
  }, [compiledTemplates, currentTabIndex])

  const download = () => {
    const zip = new JSZip();
    entities.forEach((entity) => {
      const entityTemplateData = templateData[entity.name];
      const entityCompiledTemplates = compiledTemplates[entity.name];
      entityCompiledTemplates.forEach((compiledTemplate) => {
        zip.file(`${compiledTemplate.type}/src/${compiledTemplate.path.replace("<% camelCaseName %>", entityTemplateData.camelCaseName)}`, compiledTemplate.value);
      })
    })
    zip.generateAsync({ type: "blob" }).then((zip) => {
      saveAs(zip, "generated.zip");
    });
  }

  const save = () => {
    //  TODO: HH: send entities to s3.
  }

  const load = () => {
    //  TODO: HH: get entities to s3 and display them.
  }

  const generate = () => {
    let newCompiledTemplates = {};
    if (_.isEmpty(templateData)) {
      return;
    }
    entities.forEach((entity: any) => {
      const entityCompiledTemplates = activeTemplates.map((activeTemplate) => {
        const { name, value, language, path, type } = activeTemplate;
        let entityCompiledTemplate = value;
        Object.entries(templateData[entity.name]).forEach((template) => {
          const [key, value] = template;
          entityCompiledTemplate = entityCompiledTemplate.replaceAll(`<% ${key} %>`, value);
        })
        const templateStatements = entityCompiledTemplate.match(/<% if .* %>/g);
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
                entityCompiledTemplate = entityCompiledTemplate.replace(templateStatement, "");
              } else {
                // if field is falsy keep the string to the right
                entityCompiledTemplate = entityCompiledTemplate.replace(templateStatement, templateDataInsert);
              }
            } else {
              if (templateData[templateDataField]) {
                // if field is truthy keep the string to the right
                entityCompiledTemplate = entityCompiledTemplate.replace(templateStatement, templateDataInsert);
              } else {
                // if field is falsy remove the string
                entityCompiledTemplate = entityCompiledTemplate.replace(templateStatement, "");
              }
            }
          })
        }
        // remove the blocks of linebreaks that results when removing content from the template
        entityCompiledTemplate = entityCompiledTemplate.replace(/\n+/g, "\n");
        return { name, value: entityCompiledTemplate, language, path, type };
      })
      newCompiledTemplates[entity.name] = entityCompiledTemplates;
    })

    setCompiledTemplates(newCompiledTemplates);
  }

  const onTextChange = (index: number, e: any) => {
    let entitiesUpdate = Object.values({ ...entities });
    entitiesUpdate[index][e.target.name] = e.target.value;
    setEntities(entitiesUpdate);
  };

  const onCheckboxChange = (index: number, e: any) => {
    let entitiesUpdate = Object.values({ ...entities });
    entitiesUpdate[index][e.target.name] = e.target.checked;
    setEntities(entitiesUpdate);
  }

  const onSelectDataPatternFieldKeyChange = (index: number, fieldId: string, fieldKey: string, e: any) => {
    let newDataPattern = { ...entities }[index].dataPattern;
    // HH: In most places I use the fieldId so the user can't break any functionality. However in some cases I reference fieldKey such as when update
    // the gsi's on a field change below, and since the user can update that they can cause some weird behaviour if they change a fieldKey to match
    // an existing field. So I add the protection below.
    for (let i = 0; i < newDataPattern.fields.length; i++) {
      if (newDataPattern.fields[i].key === e.target.value) {
        return;
      }
    }
    newDataPattern.fields = newDataPattern.fields.map((field) => {
      // Find the field thats being updated
      if (field.id === fieldId) {
        field.key = e.target.value;
        // When we change a field we also need to change it in any global secondary indexes
        newDataPattern.globalSecondaryIndexes = newDataPattern.globalSecondaryIndexes.map((gsi: any) => {
          ["pk", "sk"].forEach((type: string) => {
            gsi[type] = gsi[type].map((variable) => {
              if (variable === `$${fieldKey}`) {
                return `\$${e.target.value}`;
              }
              if (variable === `#${fieldKey.toUpperCase()}#`) {
                return `#${e.target.value.toUpperCase()}#`;
              }
              return variable;
            })
          })
          return gsi;
        })
      }
      return field;
    })
    let entitiesUpdate = Object.values({ ...entities });
    entitiesUpdate[index].dataPattern = newDataPattern;
    setEntities(entitiesUpdate);
  }

  const onSelectDataPatternFieldTypeChange = (index: number, fieldId: string, e: any) => {
    let newDataPattern = { ...entities }[index].dataPattern;
    newDataPattern.fields = newDataPattern.fields.map((field) => {
      // Find the field thats being updated
      if (field.id === fieldId) {
        field.type = e.target.value;
      }
      return field;
    })
    let entitiesUpdate = Object.values({ ...entities });
    entitiesUpdate[index].dataPattern = newDataPattern;
    setEntities(entitiesUpdate);
  }

  const onSelectDataPatternFieldRemove = (index: number, fieldId: string, fieldKey: string, e: any) => {
    let newDataPattern = { ...entities }[index].dataPattern;
    newDataPattern.fields = newDataPattern.fields.filter((field) => {
      // Find the field thats being removed
      if (field.id === fieldId) {
        // When we remove a field we also need to remove it from any global secondary indexes
        newDataPattern.globalSecondaryIndexes = newDataPattern.globalSecondaryIndexes.map((gsi: any) => {
          ["pk", "sk"].forEach((type: string) => {
            gsi[type] = gsi[type].filter((variable) => {
              return (variable !== `$${fieldKey}` && variable !== `#${fieldKey.toUpperCase()}#`);
            })
          })
          return gsi;
        })
        return;
      }
      return field;
    })

    let entitiesUpdate = Object.values({ ...entities });
    entitiesUpdate[index].dataPattern = newDataPattern;
    setEntities(entitiesUpdate);
  }

  const onSelectDataPatternFieldAdd = (index: number, e: any) => {
    let newDataPattern = { ...entities }[index].dataPattern;
    newDataPattern.fields.push({ id: uuidv4(), key: uuidv4(), type: "string" });
    let entitiesUpdate = Object.values({ ...entities });
    entitiesUpdate[index].dataPattern = newDataPattern;
    setEntities(entitiesUpdate);
  }

  const onSelectDataPatternGlobalSecondaryIndexTextChange = (index: number, globalSecondaryIndexId: string, e: any, updateField: string) => {
    let newDataPattern = { ...entities }[index].dataPattern;
    newDataPattern.globalSecondaryIndexes = newDataPattern.globalSecondaryIndexes.map((globalSecondaryIndex) => {
      // Find the global secondary index thats being updated
      if (globalSecondaryIndex.id === globalSecondaryIndexId) {
        globalSecondaryIndex[updateField] = e.target.value;
      }
      return globalSecondaryIndex;
    })
    let entitiesUpdate = Object.values({ ...entities });
    entitiesUpdate[index].dataPattern = newDataPattern;
    setEntities(entitiesUpdate);
  }

  const onSelectDataPatternGlobalSecondaryIndexSelectChange = (index: number, globalSecondaryIndexId: string, e: any, updateField: string) => {
    let newDataPattern = { ...entities }[index].dataPattern;
    newDataPattern.globalSecondaryIndexes = newDataPattern.globalSecondaryIndexes.map((globalSecondaryIndex) => {
      // Find the global secondary index thats being updated
      if (globalSecondaryIndex.id === globalSecondaryIndexId) {
        globalSecondaryIndex[updateField] = e.target.value;
      }
      return globalSecondaryIndex;
    })
    let entitiesUpdate = Object.values({ ...entities });
    entitiesUpdate[index].dataPattern = newDataPattern;
    setEntities(entitiesUpdate);
  }

  const onSelectDataPatternGlobalSecondaryIndexRemove = (index: number, globalSecondaryIndexId: string, e: any) => {
    let newDataPattern = { ...entities }[index].dataPattern;
    newDataPattern.globalSecondaryIndexes = newDataPattern.globalSecondaryIndexes.filter((globalSecondaryIndex) => {
      // Find the global secondary index thats being removed
      if (globalSecondaryIndex.id === globalSecondaryIndexId) {
        return;
      }
      return globalSecondaryIndex;
    })
    let entitiesUpdate = Object.values({ ...entities });
    entitiesUpdate[index].dataPattern = newDataPattern;
    setEntities(entitiesUpdate);
  }

  const onSelectDataPatternGlobalSecondaryIndexAdd = (index: number, e: any) => {
    let newDataPattern = { ...entities }[index].dataPattern;
    newDataPattern.globalSecondaryIndexes.push({ id: uuidv4(), key: `GSI${newDataPattern.globalSecondaryIndexes.length + 1}`, pk: [], sk: [] });
    let entitiesUpdate = Object.values({ ...entities });
    entitiesUpdate[index].dataPattern = newDataPattern;
    setEntities(entitiesUpdate);
  }

  const handleTabChange = (e, tabIndex) => {
    setCurrentTabIndex(tabIndex);
  }

  const globalSecondaryIndexOptions: any = [<MenuItem value={`#${entities[currentTabIndex].hash}#`}>Entity Hash</MenuItem>];
  entities[currentTabIndex].dataPattern.fields.map((field) => {
    globalSecondaryIndexOptions.push(<MenuItem value={`\$${field.key}`}>{field.key}</MenuItem>)
    globalSecondaryIndexOptions.push(<MenuItem value={`#${field.key.toUpperCase()}#`}>{field.key} Hash</MenuItem>)
  })
  if (entities[currentTabIndex].tenantId) {
    globalSecondaryIndexOptions.push(<MenuItem value={"$tenantId"}>TenantId</MenuItem>);
    globalSecondaryIndexOptions.push(<MenuItem value={"#T#"}>Tenant Hash</MenuItem>);
  }


  // TODO: HH: Move some of the items rendered below into their own components and pull them in as this file is rather bloated now
  return (<React.Fragment>
    <Box>
      <h1>Generator</h1>
      <Box sx={{ position: "relative", top: "-65px", float: "right" }}>
        <Button sx={{ margin: "0 5px" }} color={"primary"} variant="contained" onClick={load} disabled={_.isEmpty(compiledTemplates)}>Load</Button>
        <Button sx={{ margin: "0 5px" }} color={"primary"} variant="contained" onClick={save} disabled={_.isEmpty(compiledTemplates)}>Save</Button>
        <Button sx={{ margin: "0 5px" }} color={"primary"} variant="contained" onClick={download} disabled={_.isEmpty(compiledTemplates)}>Download</Button>
      </Box>

    </Box>
    <Tabs value={currentTabIndex} onChange={handleTabChange}>
      {entities.map((entity) => {
        return <Tab key={entity.name} label={entity.name} />
      })}
    </Tabs>
    <Box>
      {/* Removed for now as the templateData box is a little glitchy between rerenders */}
      {/* {templateData[entities[currentTabIndex]?.name] && <Accordion>
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
            {Object.entries(templateData[entities[currentTabIndex].name]).filter((x) => { return x[1] }).map((template) => {
              const [key, value] = template;
              return <p key={key}>{key}: {value}</p>
            })}
          </Box>
        </AccordionDetails>
      </Accordion>} */}

      <Box>
        <h2>Configuration</h2>
        <h3>Basic</h3>
        <TextField
          label={"Name"}
          name={"name"}
          value={entities[currentTabIndex].name}
          onChange={(e) => {
            onTextChange(currentTabIndex, e);
          }}>
        </TextField>
        <TextField
          label={"Hash"}
          name={"hash"}
          value={entities[currentTabIndex].hash}
          onChange={(e) => {
            onTextChange(currentTabIndex, e);
          }}>
        </TextField>
        <TextField
          label={"Limit"}
          name={"limit"}
          value={entities[currentTabIndex].limit}
          onChange={(e) => {
            onTextChange(currentTabIndex, e);
          }}>
        </TextField>
        TenantId?: <Checkbox
          name={"tenantId"}
          checked={entities[currentTabIndex].tenantId}
          onChange={(e) => {
            onCheckboxChange(currentTabIndex, e);
          }} >
        </Checkbox>
        <h3>Fields</h3>
        {entities[currentTabIndex].dataPattern?.fields.map((field) => {
          return <Box key={field.id}>
            <TextField name={"key"} value={field.key} disabled={field.id === entities[currentTabIndex].dataPattern.fields[0].id} onChange={(e) => {
              onSelectDataPatternFieldKeyChange(currentTabIndex, field.id, field.key, e);
            }} />
            <TextField name={"type"} value={field.type} disabled={field.id === entities[currentTabIndex].dataPattern.fields[0].id} onChange={(e) => {
              onSelectDataPatternFieldTypeChange(currentTabIndex, field.id, e);
            }} select>
              <MenuItem value="string" >string</MenuItem>
              <MenuItem value="boolean">boolean</MenuItem>
              <MenuItem value="number">number</MenuItem>
            </TextField>
            {field.id !== entities[currentTabIndex].dataPattern.fields[0].id && <Button variant="contained" color='error' onClick={(e) => {
              onSelectDataPatternFieldRemove(currentTabIndex, field.id, field.key, e);
            }}>Remove</Button>}
          </Box>
        })}
        <Button variant="contained" color='primary' onClick={(e) => {
          onSelectDataPatternFieldAdd(currentTabIndex, e);
        }}>Add</Button>
        <h3>Global Secondary Indexes</h3>
        {entities[currentTabIndex].dataPattern?.globalSecondaryIndexes.map((globalSecondaryIndex, index) => {
          return <Box key={globalSecondaryIndex.id}>
            <TextField name={"key"} label={"Key"} value={globalSecondaryIndex.key} disabled onChange={(e) => {
              onSelectDataPatternGlobalSecondaryIndexTextChange(currentTabIndex, globalSecondaryIndex.id, e, "key");
            }} />
            {/* TODO: For some reason label isn't working on the select field */}
            PK:
            <Select name={"pk"} multiple value={globalSecondaryIndex.pk} onChange={(e) => {
              onSelectDataPatternGlobalSecondaryIndexSelectChange(currentTabIndex, globalSecondaryIndex.id, e, "pk");
            }} renderValue={(variable) => {
              return variable.join("");
            }} >
              {globalSecondaryIndexOptions}
            </Select>
            {/* TODO: For some reason label isn't working on the select field */}
            SK:
            <Select name={"sk"} multiple value={globalSecondaryIndex.sk} onChange={(e) => {
              onSelectDataPatternGlobalSecondaryIndexSelectChange(currentTabIndex, globalSecondaryIndex.id, e, "sk");
            }} renderValue={(variable) => {
              return variable.join("");
            }} >
              {globalSecondaryIndexOptions}
            </Select>
            {index === entities[currentTabIndex].dataPattern?.globalSecondaryIndexes.length - 1 && index !== 0 && <Button variant="contained" color='error' onClick={(e) => {
              onSelectDataPatternGlobalSecondaryIndexRemove(currentTabIndex, globalSecondaryIndex.id, e);
            }}>Remove</Button>}
          </Box>
        })}
        <Button variant="contained" color='primary' onClick={(e) => {
          onSelectDataPatternGlobalSecondaryIndexAdd(currentTabIndex, e);
        }}>Add</Button>
      </Box>
      <Box>
        <h2>Preview</h2>
        {compiledTemplates[entities[currentTabIndex]?.name] && compiledTemplates[entities[currentTabIndex].name].map((compiledTemplate) => {
          const { name, value, language, type } = compiledTemplate;
          return <Accordion key={name}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              id={name}
            >
              {`${type}: ${name}`}
            </AccordionSummary>
            <AccordionDetails
              id={name}
            >
              <pre><code className={`language-${language}`}>{value}</code></pre>
            </AccordionDetails>
          </Accordion>
        })}
      </Box>
    </Box>
  </React.Fragment >
  );
}
