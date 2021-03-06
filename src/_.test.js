import flattenInfo from './flatten-info';

export default (info) => flattenInfo(['src', info]);

export const checkProperties = (clone, properties) => properties.forEach((property) => {
  const [propertyName, propertyType, typeOption, optinoalFunctionParams] = Array.isArray(property)
    ? property
    : [property, undefined, undefined, undefined];

  let message = `has property '${propertyName}'`;
  if (propertyType) {
    message = `${message} as ${propertyType}`;
  }

  if (typeof typeOption !== 'undefined') {
    message = `${message}:${typeOption}`;
    if (typeof optinoalFunctionParams !== 'undefined') {
      message = `${message}(+${optinoalFunctionParams})`;
    }
  }

  it(message, () => {
    expect(clone).to.have.property(propertyName);

    if (propertyType) {
      expect(clone[propertyName]).to.be.a(propertyType);

      if (typeof typeOption !== 'undefined') {
        if (propertyType === 'object') {
          Object.values(clone[propertyName]).forEach((value) => {
            expect(value).to.be.a(typeOption);
          });
        } else if (propertyType === 'array') {
          clone[propertyName].forEach((value) => {
            expect(value).to.be.a(typeOption);
          });
        } else if (propertyType === 'function') {
          expect(clone[propertyName]).to.have.lengthOf(typeOption);
        }
      }
    }

    // eslint-disable-next-line no-param-reassign
    delete clone[propertyName];
  });
});
