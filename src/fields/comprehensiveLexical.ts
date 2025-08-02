import type { TextFieldSingleValidation } from 'payload'
import {
  BoldFeature,
  ItalicFeature,
  UnderlineFeature,
  StrikethroughFeature,
  SubscriptFeature,
  SuperscriptFeature,
  InlineCodeFeature,
  ParagraphFeature,
  HeadingFeature,
  AlignFeature,
  IndentFeature,
  UnorderedListFeature,
  OrderedListFeature,
  ChecklistFeature,
  LinkFeature,
  RelationshipFeature,
  BlockquoteFeature,
  UploadFeature,
  HorizontalRuleFeature,
  BlocksFeature,
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
  type LinkFields,
} from '@payloadcms/richtext-lexical'

// Import all available blocks
import { Banner } from '../blocks/Banner/config'
import { CallToAction } from '../blocks/CallToAction/config'
import { Code } from '../blocks/Code/config'
import { Content } from '../blocks/Content/config'
import { MediaBlock } from '../blocks/MediaBlock/config'
import { Archive } from '../blocks/ArchiveBlock/config'

/**
 * Comprehensive Lexical Rich Text Editor Configuration
 * 
 * This configuration includes ALL available features that Payload CMS
 * supports with the Lexical editor, giving content creators maximum
 * flexibility and design capabilities.
 */
export const comprehensiveLexical = lexicalEditor({
  features: [
    // === PARAGRAPH & BASIC TEXT ===
    ParagraphFeature(),
    
    // === TEXT FORMATTING ===
    BoldFeature(),
    ItalicFeature(),
    UnderlineFeature(),
    StrikethroughFeature(),
    SubscriptFeature(),
    SuperscriptFeature(),
    InlineCodeFeature(),
    
    // === HEADINGS ===
    HeadingFeature({
      enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
    }),
    
    // === TEXT ALIGNMENT & INDENTATION ===
    AlignFeature(),
    IndentFeature(),
    
    // === LISTS ===
    UnorderedListFeature(),
    OrderedListFeature(),
    ChecklistFeature(),
    
    // === LINKS & RELATIONSHIPS ===
    LinkFeature({
      enabledCollections: ['pages', 'posts', 'projects', 'notices', 'theme-pages'],
      fields: ({ defaultFields }) => {
        const defaultFieldsWithoutUrl = defaultFields.filter((field) => {
          if ('name' in field && field.name === 'url') return false
          return true
        })

        return [
          ...defaultFieldsWithoutUrl,
          {
            name: 'url',
            type: 'text',
            admin: {
              condition: (_data, siblingData) => siblingData?.linkType !== 'internal',
            },
            label: ({ t }) => t('fields:enterURL'),
            required: true,
            validate: ((value, options) => {
              if ((options?.siblingData as LinkFields)?.linkType === 'internal') {
                return true
              }
              return value ? true : 'URL is required'
            }) as TextFieldSingleValidation,
          },
          {
            name: 'rel',
            label: 'Rel Attribute',
            type: 'select',
            hasMany: true,
            options: ['noopener', 'noreferrer', 'nofollow'],
            admin: {
              description: 'Add rel attributes for external links (security and SEO)',
            },
          },
          {
            name: 'newTab',
            label: 'Open in New Tab',
            type: 'checkbox',
            defaultValue: false,
          },
        ]
      },
    }),
    
    RelationshipFeature({
      enabledCollections: ['pages', 'posts', 'projects', 'notices', 'theme-pages', 'team-members'],
    }),
    
    // === BLOCK ELEMENTS ===
    BlockquoteFeature(),
    UploadFeature({
      collections: {
        media: {
          fields: [
            {
              name: 'caption',
              type: 'text',
              label: 'Caption',
            },
            {
              name: 'credit',
              type: 'text',
              label: 'Credit/Attribution',
            },
          ],
        },
      },
    }),
    HorizontalRuleFeature(),
    
    // === BLOCKS ===
    BlocksFeature({
      blocks: [
        Banner,
        CallToAction,
        Code,
        Content,
        MediaBlock,
        Archive,
      ],
    }),
    
    // === TOOLBARS ===
    FixedToolbarFeature(),
    InlineToolbarFeature(),
  ],
})

/**
 * Alternative configuration for simpler use cases
 * Includes most features but excludes some advanced blocks
 */
export const standardLexical = lexicalEditor({
  features: [
    ParagraphFeature(),
    BoldFeature(),
    ItalicFeature(),
    UnderlineFeature(),
    StrikethroughFeature(),
    InlineCodeFeature(),
    HeadingFeature({
      enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
    }),
    AlignFeature(),
    UnorderedListFeature(),
    OrderedListFeature(),
    ChecklistFeature(),
    LinkFeature({
      enabledCollections: ['pages', 'posts', 'projects'],
      fields: ({ defaultFields }) => {
        const defaultFieldsWithoutUrl = defaultFields.filter((field) => {
          if ('name' in field && field.name === 'url') return false
          return true
        })

        return [
          ...defaultFieldsWithoutUrl,
          {
            name: 'url',
            type: 'text',
            admin: {
              condition: (_data, siblingData) => siblingData?.linkType !== 'internal',
            },
            label: ({ t }) => t('fields:enterURL'),
            required: true,
            validate: ((value, options) => {
              if ((options?.siblingData as LinkFields)?.linkType === 'internal') {
                return true
              }
              return value ? true : 'URL is required'
            }) as TextFieldSingleValidation,
          },
        ]
      },
    }),
    BlockquoteFeature(),
    UploadFeature({
      collections: {
        media: {
          fields: [
            {
              name: 'caption',
              type: 'text',
              label: 'Caption',
            },
          ],
        },
      },
    }),
    HorizontalRuleFeature(),
    FixedToolbarFeature(),
    InlineToolbarFeature(),
  ],
})