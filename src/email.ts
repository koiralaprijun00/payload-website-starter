// @ts-ignore: If you see a type error for nodemailer, run: npm i --save-dev @types/nodemailer
import nodemailer from 'nodemailer'
// If the following import fails, define EmailAdapter locally below
// import type { EmailAdapter } from 'payload/dist/email/types'
import type { Payload } from 'payload'
import type { SendMailOptions as NodemailerSendMailOptions } from 'nodemailer'

type SendEmailArgs = {
  to: string | string[]
  subject: string
  html?: string
  text?: string
  from?: string
}

export type EmailAdapter = {
  sendEmail: (args: SendEmailArgs) => Promise<void>
  fromName?: string
  fromAddress?: string
}

export const nodemailerTransport = (options: {
  host: string
  port: number
  secure: boolean
  auth: { user: string; pass: string }
  fromName?: string
  fromAddress?: string
}) => {
  const transporter = nodemailer.createTransport({
    host: options.host,
    port: options.port,
    secure: options.secure,
    auth: options.auth,
  })

  return ({ payload }: { payload: Payload }) => ({
    defaultFromAddress: options.fromAddress || '',
    defaultFromName: options.fromName || '',
    name: 'nodemailer',
    sendEmail: async (message: NodemailerSendMailOptions) => {
      await transporter.sendMail({
        ...message,
        from:
          message.from ||
          (options.fromName && options.fromAddress
            ? `"${options.fromName}" <${options.fromAddress}>`
            : options.fromAddress),
      })
    },
  })
}
