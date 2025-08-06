import type { Payload } from 'payload'

export const seedCareers = async (payload: Payload): Promise<void> => {
  await payload.create({
    collection: 'careers',
    data: {
      title: 'Program Associate',
      status: 'open',
      deadline: '2025-05-30T23:59:59.000Z',
      location: 'Kathmandu, Nepal',
      type: 'full-time',
      experience:
        '1 year (As part of our affirmative action to promote growth, Himāvat encourages freshers to apply)',
      summary:
        'Himāvat Institute is a leading research hub and provider of research services based in Kathmandu, Nepal, and is committed to promoting growth, transparency, academic rigor, and diversity in everything we do. Our work spans across disciplines, engaging in impactful research and capacity building to inform better policies and practices in Nepal and beyond.',
      description: {
        root: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              children: [
                {
                  text: 'We are seeking a ',
                },
                {
                  text: 'dynamic and creative Program Associate',
                  bold: true,
                  italic: true,
                },
                {
                  text: ' to lead our social media and communications efforts, while also supporting broader program activities. This is a unique opportunity to contribute to a growing research organization and shape how we engage with the public.',
                },
              ],
            },
            {
              type: 'paragraph',
              children: [
                {
                  text: 'Position Details:',
                  bold: true,
                },
              ],
            },
            {
              type: 'list',
              listType: 'bullet',
              children: [
                {
                  type: 'listItem',
                  children: [
                    {
                      type: 'paragraph',
                      children: [
                        {
                          text: 'Location: Kathmandu, Nepal',
                        },
                      ],
                    },
                  ],
                },
                {
                  type: 'listItem',
                  children: [
                    {
                      type: 'paragraph',
                      children: [
                        {
                          text: 'Type: Full-time',
                        },
                      ],
                    },
                  ],
                },
                {
                  type: 'listItem',
                  children: [
                    {
                      type: 'paragraph',
                      children: [
                        {
                          text: 'Start Date: As soon as possible',
                        },
                      ],
                    },
                  ],
                },
                {
                  type: 'listItem',
                  children: [
                    {
                      type: 'paragraph',
                      children: [
                        {
                          text: 'Deadline: 30 May 2025',
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              type: 'paragraph',
              children: [
                {
                  text: 'Shortlisting and interviews will be conducted on a rolling basis – early applicants will be prioritized.',
                  italic: true,
                },
              ],
            },
          ],
        },
      },
      responsibilities: [
        { responsibility: 'Manage and grow our social media presence across platforms' },
        { responsibility: 'Create engaging digital content: posts, stories, reels' },
        { responsibility: 'Assist in the creation, editing, and promotion of podcasts' },
        { responsibility: 'Draft newsletters, blogs, and communication materials' },
        {
          responsibility:
            'Support the planning and execution of research projects, events and workshops',
        },
        { responsibility: 'Monitor, evaluate, and report on communication performance' },
        { responsibility: 'Support as a Principle Secretary of organization' },
      ],
      requirements: [
        { requirement: "Bachelor's degree in Communications, Marketing, or related field" },
        { requirement: 'Strong written and verbal communication skills in English and Nepali' },
        { requirement: 'Experience with social media platforms and content creation' },
        { requirement: 'Basic knowledge of design tools (Canva, Photoshop, etc.)' },
        { requirement: 'Interest in research, policy, and social impact' },
        { requirement: 'Ability to work independently and manage multiple tasks' },
        { requirement: 'Creative mindset with attention to detail' },
      ],
      applicationEmail: 'career@himavat-institute.com.np',
      applicationInstructions:
        'Please send your CV to career@himavat-institute.com.np with the subject line "Application: Program Associate – Communications".\n\nWe encourage you to apply as early as possible. Selection is conducted on a first-come, first-interview basis.',
    },
  })

  await payload.create({
    collection: 'careers',
    data: {
      title: 'Program Support Intern',
      status: 'closed',
      deadline: '2024-11-01T23:59:59.000Z',
      location: 'Kathmandu, Nepal',
      type: 'internship',
      experience: 'Entry level',
      summary:
        'Support our research and program activities while gaining valuable experience in wildlife conservation and research methodologies.',
      description: {
        root: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              children: [
                {
                  text: 'This internship program offers hands-on experience in wildlife conservation research and program implementation. Interns will work closely with our research team to support ongoing projects and initiatives.',
                },
              ],
            },
          ],
        },
      },
      responsibilities: [
        { responsibility: 'Assist with data collection and analysis for research projects' },
        { responsibility: 'Support field work and wildlife monitoring activities' },
        { responsibility: 'Help prepare research reports and presentations' },
        { responsibility: 'Assist with event planning and coordination' },
        { responsibility: 'Support administrative tasks and documentation' },
      ],
      requirements: [
        { requirement: 'Currently enrolled in or recently graduated from relevant degree program' },
        { requirement: 'Interest in wildlife conservation and environmental research' },
        { requirement: 'Basic computer skills and familiarity with MS Office' },
        { requirement: 'Good communication skills in English and Nepali' },
        { requirement: 'Ability to work in field conditions' },
      ],
      applicationEmail: 'internships@himavat-institute.com.np',
      applicationInstructions:
        'This position has been filled. Please check back for future internship opportunities.',
    },
  })

  await payload.create({
    collection: 'careers',
    data: {
      title: 'Communication and Social Media Intern',
      status: 'closed',
      deadline: '2024-11-01T23:59:59.000Z',
      location: 'Remote/Kathmandu',
      type: 'internship',
      experience: 'Entry level',
      summary:
        'Join our communications team to help amplify our conservation message through digital platforms and content creation.',
      description: {
        root: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              children: [
                {
                  text: 'We were looking for a creative and enthusiastic intern to support our communication efforts and help us reach wider audiences with our conservation message.',
                },
              ],
            },
          ],
        },
      },
      responsibilities: [
        { responsibility: 'Create content for social media platforms' },
        { responsibility: 'Assist with website content updates and blog posts' },
        { responsibility: 'Help design graphics and visual content' },
        { responsibility: 'Support newsletter creation and distribution' },
        { responsibility: 'Monitor social media engagement and analytics' },
      ],
      requirements: [
        { requirement: 'Strong interest in social media and digital communications' },
        { requirement: 'Basic design skills or willingness to learn' },
        { requirement: 'Excellent written communication skills' },
        { requirement: 'Familiarity with social media platforms' },
        { requirement: 'Creative thinking and attention to detail' },
      ],
      applicationEmail: 'internships@himavat-institute.com.np',
      applicationInstructions: 'This internship position has been filled.',
    },
  })

  await payload.create({
    collection: 'careers',
    data: {
      title: 'Research Intern',
      status: 'closed',
      deadline: '2023-11-11T23:59:59.000Z',
      location: 'Kathmandu, Nepal',
      type: 'internship',
      experience: 'Entry level',
      summary:
        'Gain research experience while contributing to important wildlife conservation studies and data analysis projects.',
      description: {
        root: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              children: [
                {
                  text: 'This research internship provided opportunities to work on cutting-edge conservation research projects and develop valuable research skills.',
                },
              ],
            },
          ],
        },
      },
      responsibilities: [
        { responsibility: 'Conduct literature reviews and research synthesis' },
        { responsibility: 'Assist with data collection and field surveys' },
        { responsibility: 'Support statistical analysis and data visualization' },
        { responsibility: 'Help prepare research manuscripts and reports' },
        { responsibility: 'Participate in research meetings and presentations' },
      ],
      requirements: [
        { requirement: 'Background in biology, ecology, or related field' },
        { requirement: 'Strong analytical and research skills' },
        { requirement: 'Experience with statistical software (R, SPSS) preferred' },
        { requirement: 'Good written and verbal communication skills' },
        { requirement: 'Attention to detail and accuracy' },
      ],
      applicationEmail: 'research@himavat-institute.com.np',
      applicationInstructions: 'This research internship has been completed.',
    },
  })

  console.log('✅ Careers seeded successfully')
}
