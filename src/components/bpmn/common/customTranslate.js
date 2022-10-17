/*
 * @Description:
 * @Version: 1.0
 * @Author: wenbin
 * @Date: 2022-09-01 11:00:34
 * @LastEditors: wenbin
 * @LastEditTime: 2022-09-01 11:00:39
 * @FilePath: /bi-table-test/src/components/bpmn/common/customTranslate.js
 * Copyright (C) 2022 wenbin. All rights reserved.
 */
import translations from "../lang/zh";

export default function customTranslate(template, replacements) {
  replacements = replacements || {};

  // Translate
  template = translations[template] || template;

  // Replace
  return template.replace(/{([^}]+)}/g, function(_, key) {
    var str = replacements[key];
    if (
      translations[replacements[key]] !== null &&
      translations[replacements[key]] !== "undefined"
    ) {
      str = translations[replacements[key]];
    }
    return str || "{" + key + "}";
  });
}
