export const serviceDetails: Record<string, { heading: string; text: string }[]> = {
  "ai-automation": [
    {
      "heading": "Where automation helps",
      "text": "Start with a repeatable task: interpreting feedback, enriching a lead, preparing a report or routing a request. Use language models for the language work and ordinary code for predictable data movement and business rules."
    },
    {
      "heading": "Evaluate a useful pilot",
      "text": "Compare a pilot against the same sample of manual tasks. Review correct outcomes, exceptions, processing time and cost per completed task before expanding the workflow."
    }
  ],
  "n8n-workflow-automation": [
    {
      "heading": "Design for failures, not only the happy path",
      "text": "Define retry rules, stable work identifiers and a visible place for unresolved exceptions. An API timeout should not cause duplicate records or repeated notifications."
    },
    {
      "heading": "Deployment and handover",
      "text": "Choose hosting according to ownership, integration needs and where data can be processed. Include configuration instructions, execution records and recovery steps in the scope."
    }
  ],
  "llm-ai-agent-development": [
    {
      "heading": "Choose the smallest useful system",
      "text": "Classification or extraction may need only a single structured model call. Add retrieval for approved business content, and consider an agent only when the task needs controlled choices among tools."
    },
    {
      "heading": "Test before connecting real systems",
      "text": "Evaluate representative questions, difficult inputs, unsupported answers and incorrect tool actions. Source references and a clear fallback remain important even with retrieval."
    }
  ],
  "ai-chatbot-for-website": [
    {
      "heading": "Ground answers in approved content",
      "text": "Use site pages, brochures, PDFs or policies agreed with your team. Build a knowledge base, provide source references and offer an honest fallback when the content cannot support an answer."
    },
    {
      "heading": "Disclosure and human handoff",
      "text": "Make clear that visitors are speaking with AI. Agree what contact details are collected, who can access conversations and when a team member should take over. Review privacy obligations before launch."
    }
  ],
  "freelance-website-developer-noida": [
    {
      "heading": "Connect the website to your business",
      "text": "Pair the customer-facing site with enquiry forms, lead routing and the integrations your team actually uses. Optional AI features should support the visitor journey rather than distract from it."
    },
    {
      "heading": "Plan content and delivery together",
      "text": "Scope the pages, design direction, content responsibilities and integration access before estimating delivery. Testing and handover are part of planning the complete project."
    }
  ],
  "wordpress-php-development": [
    {
      "heading": "Editable without a developer",
      "text": "Set up WordPress so your team can update pages, posts and images on their own, with a structure that keeps the design consistent as content changes."
    },
    {
      "heading": "Custom PHP where it's needed",
      "text": "Use custom themes, plugins or core PHP and MySQL for the parts an off-the-shelf plugin can't handle — forms, integrations, dashboards or data imports."
    }
  ]
};
