import { ArrowRight, Check, Database, FileText, Shield } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export const HowItWorks = () => {
  const { t } = useTranslation()

  return (
    <section
      id="how-it-works"
      className="w-full py-16 bg-light-bg-primary dark:bg-dark-bg-primary transition-colors duration-300"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-light-text-primary dark:text-dark-text-primary">
            {t('howItWorks.title')}
          </h2>
          <p className="text-light-text-secondary dark:text-dark-text-muted max-w-2xl mx-auto">
            {t('howItWorks.description')}
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <div className="space-y-8">
              <WorkflowStep
                number="1"
                title={t('howItWorks.steps.documentUpload.title')}
                description={t('howItWorks.steps.documentUpload.description')}
              />
              <WorkflowStep
                number="2"
                title={t('howItWorks.steps.aiValidation.title')}
                description={t('howItWorks.steps.aiValidation.description')}
              />
              <WorkflowStep
                number="3"
                title={t('howItWorks.steps.zkpGeneration.title')}
                description={t('howItWorks.steps.zkpGeneration.description')}
              />
              <WorkflowStep
                number="4"
                title={t('howItWorks.steps.blockchainVerification.title')}
                description={t('howItWorks.steps.blockchainVerification.description')}
              />
              <WorkflowStep
                number="5"
                title={t('howItWorks.steps.customsClearance.title')}
                description={t('howItWorks.steps.customsClearance.description')}
              />
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <div className="bg-light-bg-card dark:bg-dark-bg-secondary/70 border border-light-border dark:border-dark-border rounded-xl p-6 relative shadow-lg">
              <div className="absolute -top-4 -right-4 bg-light-accent-primary dark:bg-dark-accent-primary text-white text-xs font-bold px-2 py-1 rounded">
                {t('howItWorks.secureWorkflow')}
              </div>
              <div className="space-y-6">
                <div className="bg-light-bg-secondary dark:bg-dark-bg-primary rounded-lg p-4">
                  <div className="flex items-center mb-3">
                    <div className="h-2 w-2 rounded-full bg-light-accent-primary dark:bg-dark-accent-primary mr-2"></div>
                    <span className="text-sm text-light-text-secondary dark:text-dark-text-muted">
                      {t('howItWorks.documentVerification')}
                    </span>
                  </div>
                  <div className="flex flex-col space-y-4">
                    <div className="flex items-center">
                      <div className="bg-light-bg-primary dark:bg-dark-bg-secondary w-10 h-10 rounded-full flex items-center justify-center mr-4">
                        <FileText
                          size={20}
                          className="text-light-text-secondary dark:text-dark-text-muted"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="h-2 bg-light-bg-primary dark:bg-dark-bg-secondary rounded-full w-full mb-1">
                          <div
                            className="h-2 bg-green-500 rounded-full"
                            style={{
                              width: '100%',
                            }}
                          ></div>
                        </div>
                        <div className="text-xs text-light-text-secondary dark:text-dark-text-muted">
                          {t('howItWorks.importDeclaration')}
                        </div>
                      </div>
                      <Check size={16} className="text-green-500 ml-2" />
                    </div>
                    <ArrowIcon />
                    <div className="flex items-center">
                      <div className="bg-light-bg-primary dark:bg-dark-bg-secondary w-10 h-10 rounded-full flex items-center justify-center mr-4">
                        <Shield
                          size={20}
                          className="text-light-text-secondary dark:text-dark-text-muted"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="h-2 bg-light-bg-primary dark:bg-dark-bg-secondary rounded-full w-full mb-1">
                          <div
                            className="h-2 bg-green-500 rounded-full"
                            style={{
                              width: '100%',
                            }}
                          ></div>
                        </div>
                        <div className="text-xs text-light-text-secondary dark:text-dark-text-muted">
                          {t('howItWorks.zkpGenerationStatus')}
                        </div>
                      </div>
                      <Check size={16} className="text-green-500 ml-2" />
                    </div>
                    <ArrowIcon />
                    <div className="flex items-center">
                      <div className="bg-light-bg-primary dark:bg-dark-bg-secondary w-10 h-10 rounded-full flex items-center justify-center mr-4">
                        <Database
                          size={20}
                          className="text-light-text-secondary dark:text-dark-text-muted"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="h-2 bg-light-bg-primary dark:bg-dark-bg-secondary rounded-full w-full mb-1">
                          <div
                            className="h-2 bg-light-accent-primary dark:bg-dark-accent-primary rounded-full"
                            style={{
                              width: '75%',
                            }}
                          ></div>
                        </div>
                        <div className="text-xs text-light-text-secondary dark:text-dark-text-muted">
                          {t('howItWorks.blockchainVerificationStatus')}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-light-bg-secondary dark:bg-dark-bg-primary rounded-lg p-4">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sm text-light-text-secondary dark:text-dark-text-muted">
                      {t('howItWorks.zeroKnowledgeProof')}
                    </span>
                    <span className="text-xs bg-light-bg-primary dark:bg-dark-bg-secondary text-light-text-secondary dark:text-dark-text-muted px-2 py-0.5 rounded">
                      {t('howItWorks.generated')}
                    </span>
                  </div>
                  <div className="font-mono text-xs bg-light-bg-primary dark:bg-dark-bg-primary p-3 rounded text-light-text-secondary dark:text-dark-text-muted overflow-x-auto">
                    {'{'}
                    <br />
                    &nbsp;&nbsp;"proof": "0x7f9a2c5b8d3e1f0a...",
                    <br />
                    &nbsp;&nbsp;"publicInputs": {'{'}
                    <br />
                    &nbsp;&nbsp;&nbsp;&nbsp;"documentHash": "0x3a1b2c...",
                    <br />
                    &nbsp;&nbsp;&nbsp;&nbsp;"timestamp": 1678234567,
                    <br />
                    &nbsp;&nbsp;&nbsp;&nbsp;"validationStatus": true
                    <br />
                    &nbsp;&nbsp;{'}'},<br />
                    &nbsp;&nbsp;"blockchainTx": "0x8c7b6a..."
                    <br />
                    {'}'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

const WorkflowStep = ({
  number,
  title,
  description,
}: {
  number: string
  title: string
  description: string
}) => {
  return (
    <div className="flex gap-4">
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-light-accent-primary dark:bg-dark-accent-primary flex items-center justify-center text-white font-bold">
        {number}
      </div>
      <div>
        <h3 className="text-xl font-semibold mb-1 text-light-text-primary dark:text-dark-text-primary">
          {title}
        </h3>
        <p className="text-light-text-secondary dark:text-dark-text-muted">{description}</p>
      </div>
    </div>
  )
}
const ArrowIcon = () => (
  <div className="flex justify-center">
    <ArrowRight
      size={16}
      className="text-light-accent-primary dark:text-dark-accent-primary rotate-90"
    />
  </div>
)
