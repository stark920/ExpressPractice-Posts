const postValidator = (body) => {
  const errorMessage = [];
  const formattedBody = {};

  validateName(body?.name, errorMessage, formattedBody);
  validateTags(body?.tags, errorMessage, formattedBody);
  validateType(body?.type, errorMessage, formattedBody);
  validateImage(body?.image, errorMessage, formattedBody);
  validateContent(body?.content, errorMessage, formattedBody);

  if (errorMessage.length > 0) {
    return { errorMessage };
  } else {
    return formattedBody;
  }
};

function validateName(name, errorMessage, formattedBody) {
  if (!name) {
    errorMessage.push('名稱 必填');
    return;
  }
  if (typeof name !== 'string') {
    errorMessage.push('名稱 格式不正確');
    return;
  }
  if (name.length < 1 || name.length > 10) {
    errorMessage.push('名稱 限制為 1 ~ 10 個字元');
    return;
  }
  formattedBody.name = name.trim();
  return;
}

function validateTags(tags, errorMessage, formattedBody) {
  if (!tags) {
    errorMessage.push('標籤 必填');
    return;
  }
  if (!Array.isArray(tags)) {
    errorMessage.push('標籤格式不正確');
    return;
  }
  const filterTags = tags.filter(Boolean);
  if (filterTags.length < tags.length || tags.length === 0) {
    errorMessage.push('請勿輸入空白標籤');
    return;
  }
  formattedBody.tags = filterTags.map((el) => el.toString());
  return;
}

function validateType(type, errorMessage, formattedBody) {
  if (!type) {
    errorMessage.push('類型 必選');
    return;
  }
  if (type === 'private' || type === 'public') {
    formattedBody.type = type;
    return;
  }
  errorMessage.push('請選擇類型（public 或 private）');
  return;
}

function validateImage(image, errorMessage, formattedBody) {
  if (image) {
    formattedBody.image = image.toString().trim();
    return;
  }
  return;
}

function validateContent(content, errorMessage, formattedBody) {
  if (!content) {
    errorMessage.push('內容 必填');
    return;
  }
  if (typeof content !== 'string') {
    errorMessage.push('內容 格式不正確');
    return;
  }
  if (content.length < 1) {
    errorMessage.push('內容 至少要有 1 個字元');
    return;
  }
  formattedBody.content = content.trim();
  return;
}

module.exports = postValidator;
