const options = {
  language: {
    key: '{{key}} ',
    any: {
      unknown: 'is not allowed',
      invalid: 'contains an invalid value',
      empty: 'cannot be empty',
      required: 'is required',
      allowOnly: 'must be one of {{valids}}',
      default: 'threw an error when running default method',
    },
    string: {
      base: 'must be a string',
      min: 'length must be at least {{limit}} characters long',
      max: 'length must be less than or equal to {{limit}} characters long',
      length: 'length must be {{limit}} characters long',
      alphanum: 'must only contain alpha-numeric characters',
      token: 'must only contain alpha-numeric and underscore characters',
      regex: {
        base: 'format is Invalid!',
      },
      email: 'must be a valid email',
      uri: 'must be a valid uri',
      uriCustomScheme: 'must be a valid uri with a scheme matching the {{scheme}} pattern',
      isoDate: 'must be a valid ISO 8601 date',
      guid: 'must be a valid GUID',
      hex: 'must only contain hexadecimal characters',
      hostname: 'must be a valid hostname',
      lowercase: 'must only contain lowercase characters',
      uppercase: 'must only contain uppercase characters',
      trim: 'must not have leading or trailing whitespace',
      creditCard: 'must be a credit card',
      ref: 'references "{{ref}}" which is not a number',
      ip: 'must be a valid ip address with a {{cidr}} CIDR',
      ipVersion: 'must be a valid ip address of one of the following versions {{version}} with a {{cidr}} CIDR',
    },
  },
};

export default options;
