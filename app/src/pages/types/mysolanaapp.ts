/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/mysolanaapp.json`.
 */
export type Mysolanaapp = {
  "address": "6PMijRajWR4SCmtscLSefMV2AqLx2JV5ii5xa7GQBkL1",
  "metadata": {
    "name": "mysolanaapp",
    "version": "0.1.0",
    "spec": "0.1.0",
    "description": "Created with Anchor"
  },
  "instructions": [
    {
      "name": "initialize",
      "discriminator": [
        175,
        175,
        109,
        31,
        13,
        152,
        155,
        237
      ],
      "accounts": [
        {
          "name": "newAccount",
          "writable": true,
          "signer": true
        },
        {
          "name": "signer",
          "writable": true,
          "signer": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "salary",
          "type": "u64"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "salaryAccount",
      "discriminator": [
        231,
        52,
        198,
        157,
        140,
        215,
        152,
        242
      ]
    }
  ],
  "types": [
    {
      "name": "salaryAccount",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "salary",
            "type": "u64"
          },
          {
            "name": "authority",
            "type": "pubkey"
          }
        ]
      }
    }
  ]
};
