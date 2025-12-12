import React, { useState } from 'react';
import { Send, ArrowRight, Building2, User, Users } from 'lucide-react';

const HeviossoSurvey = () => {
  const [currentSurvey, setCurrentSurvey] = useState('dsi'); // 'dsi' ou 'prestataire'
  const [agentName, setAgentName] = useState('');
  const [formData, setFormData] = useState({});
  const [currentSection, setCurrentSection] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Configuration des sections
  const surveys = {
    dsi: {
      title: "Questionnaire DSI / Responsables IT des PME",
      intro: "Dans le cadre du développement d'une solution de cybersécurité adaptée aux PME, nous menons une étude pour mieux comprendre vos besoins et défis en matière de protection réseau. Ce questionnaire prend environ 8-10 minutes.",
      sections: [
        {
          name: "Profil de l'entreprise",
          questions: [
            { id: 'q1', label: "Quel est le secteur d'activité de votre entreprise ?", type: 'radio', options: ['Commerce / Retail', 'Services (Conseil, Comptabilité, etc.)', 'Industrie / Manufacturing', 'Santé', 'Éducation', 'Technologie / IT', 'Finance / Assurance'], hasOther: true },
            { id: 'q2', label: "Quelle est la taille de votre entreprise ?", type: 'radio', options: ['5-10 employés', '11-50 employés', '51-100 employés', '101-250 employés', 'Plus de 250 employés'] },
            { id: 'q3', label: "Combien d'appareils sont connectés à votre réseau local ?", type: 'radio', options: ['Moins de 20', '20-50', '51-100', '101-200', 'Plus de 200'] },
            { id: 'q4', label: "Quel est votre rôle dans l'entreprise ?", type: 'radio', options: ['DSI / Directeur IT', 'Responsable IT / Administrateur réseau', 'Technicien IT', 'Dirigeant / Gérant (sans équipe IT dédiée)'], hasOther: true }
          ]
        },
        {
          name: "Infrastructure et maturité technique",
          questions: [
            { id: 'q5', label: "Quelle est votre infrastructure réseau actuelle ?", type: 'checkbox', options: ['Routeur principal (Box opérateur ou routeur pro)', 'Switch(s) manageable(s)', 'Switch(s) non manageable(s)', 'Pare-feu matériel dédié', 'Points d\'accès WiFi professionnels', 'Serveur(s) sur site', 'Cloud uniquement (pas de serveur local)', 'Je ne sais pas exactement'] },
            { id: 'q6', label: "Vos switchs réseau sont-ils 'manageables' ?", type: 'radio', options: ['Oui, tous', 'Oui, certains seulement', 'Non, switchs basiques', 'Je ne sais pas'] },
            { id: 'q7', label: "Avez-vous une équipe IT interne ?", type: 'radio', options: ['Oui, équipe dédiée (2+ personnes)', 'Oui, 1 personne à temps plein', 'Oui, 1 personne à temps partiel', 'Non, prestataire externe uniquement', 'Non, personne (je me débrouille)'] }
          ]
        },
        {
          name: "Problèmes et incidents de sécurité",
          questions: [
            { id: 'q8', label: "Avez-vous déjà subi une cyberattaque ou un incident de sécurité ?", type: 'checkbox', options: ['Oui, infection par malware/virus', 'Oui, ransomware (demande de rançon)', 'Oui, phishing réussi (employé compromis)', 'Oui, attaque DDoS', 'Oui, intrusion réseau détectée', 'Oui, fuite de données', 'Non, jamais à ma connaissance', 'Je ne sais pas'] },
            { id: 'q9', label: "Si vous avez subi une attaque, comment l'avez-vous détectée ?", type: 'radio', options: ['Alerte de notre solution de sécurité', 'Signalement d\'un employé', 'Détection manuelle (analyse des logs)', 'Notification d\'un client/partenaire', 'Trop tard (après impact visible)', 'Non applicable (jamais eu d\'incident)'] },
            { id: 'q10', label: "À quelle fréquence vous inquiétez-vous de la sécurité de votre réseau ?", type: 'radio', options: ['Quotidiennement', 'Hebdomadairement', 'Mensuellement', 'Rarement', 'Jamais'] }
          ]
        },
        {
          name: "Solutions actuelles",
          questions: [
            { id: 'q11', label: "Quelles solutions de sécurité réseau utilisez-vous actuellement ?", type: 'checkbox', options: ['Antivirus/EDR sur les postes de travail', 'Pare-feu matériel dédié', 'Pare-feu intégré au routeur (basique)', 'IDS/IPS', 'Solution de monitoring réseau', 'VPN pour accès distant', 'Filtrage DNS', 'Aucune solution spécifique'], hasOther: true },
            { id: 'q12', label: "Êtes-vous satisfait de vos solutions de sécurité actuelles ?", type: 'radio', options: ['Très satisfait', 'Plutôt satisfait', 'Neutre', 'Plutôt insatisfait', 'Très insatisfait', 'Je n\'ai pas de solution'] },
            { id: 'q13', label: "Si vous êtes insatisfait, pourquoi ?", type: 'checkbox', options: ['Trop complexe à configurer/maintenir', 'Trop cher', 'Trop de fausses alertes', 'Pas assez efficace', 'Nécessite des compétences que je n\'ai pas', 'Ralentit le réseau', 'Manque de visibilité'], hasOther: true }
          ]
        },
        {
          name: "Besoins et attentes",
          questions: [
            { id: 'q14', label: "Combien de temps pouvez-vous consacrer par semaine à la gestion de la sécurité réseau ?", type: 'radio', options: ['Moins de 30 minutes', '30 minutes à 1 heure', '1 à 3 heures', '3 à 5 heures', 'Plus de 5 heures'] },
            { id: 'q15', label: "Préférez-vous une solution qui :", type: 'radio', options: ['Bloque automatiquement les menaces', 'M\'alerte et me laisse décider', 'Un mix : bloque les menaces évidentes, m\'alerte pour les cas ambigus'] },
            { id: 'q16', label: "Quel type de déploiement préférez-vous ?", type: 'radio', options: ['Boîtier physique sur site (plug & play)', 'Solution 100% cloud', 'Hybride (boîtier local + gestion cloud)', 'Logiciel à installer sur mon serveur'] }
          ]
        },
        {
          name: "Budget et adoption",
          questions: [
            { id: 'q17', label: "Quel est votre budget annuel pour la cybersécurité réseau ?", type: 'radio', options: ['Moins de 500 €', '500 € - 1 500 €', '1 500 € - 3 000 €', '3 000 € - 5 000 €', '5 000 € - 10 000 €', 'Plus de 10 000 €', 'Pas de budget dédié'] },
            { id: 'q18', label: "Seriez-vous prêt à tester une nouvelle solution IDS/IPS basée sur l'IA ?", type: 'radio', options: ['Oui, très intéressé', 'Oui, si le prix est raisonnable', 'Peut-être, je veux en savoir plus', 'Non, satisfait de ma solution actuelle', 'Non, pas convaincu par l\'IA'] },
            { id: 'q19', label: "Qu'est-ce qui vous freinerait le plus dans l'adoption d'une nouvelle solution ?", type: 'checkbox', maxSelect: 2, options: ['Le coût', 'La complexité d\'installation', 'La peur de perturber le réseau', 'Le manque de temps', 'Le manque de confiance', 'La compatibilité'], hasOther: true }
          ]
        },
        {
          name: "Question finale",
          questions: [
            { id: 'q20', label: "Si vous pouviez concevoir la solution IDS/IPS idéale pour votre PME, quelle serait sa fonctionnalité la plus importante ?", type: 'textarea' },
            { id: 'email', label: "Email (optionnel - pour recevoir les résultats)", type: 'text', optional: true }
          ]
        }
      ]
    },
    prestataire: {
      title: "Questionnaire Prestataires de Services IT",
      intro: "En tant que professionnel intervenant auprès de PME, votre expérience terrain est précieuse. Nous développons une solution de cybersécurité et aimerions connaître les défis réels que vous rencontrez. Ce questionnaire prend environ 7-9 minutes.",
      sections: [
        {
          name: "Votre profil",
          questions: [
            { id: 'q1', label: "Quelle est votre activité principale ?", type: 'radio', options: ['Consultant IT / Cybersécurité indépendant', 'Entreprise de services IT (SSII, MSP)', 'Installateur réseau / intégrateur', 'Administrateur systèmes freelance', 'Technicien support IT'], hasOther: true },
            { id: 'q2', label: "Depuis combien de temps intervenez-vous auprès de PME ?", type: 'radio', options: ['Moins d\'1 an', '1-3 ans', '3-5 ans', '5-10 ans', 'Plus de 10 ans'] },
            { id: 'q3', label: "Combien de PME accompagnez-vous actuellement ?", type: 'radio', options: ['1-5 PME', '6-10 PME', '11-20 PME', '21-50 PME', 'Plus de 50 PME'] },
            { id: 'q4', label: "Dans quels secteurs interviennent principalement vos clients PME ?", type: 'checkbox', options: ['Commerce / Retail', 'Services', 'Industrie', 'Santé', 'Éducation', 'Technologie'], hasOther: true }
          ]
        },
        {
          name: "Constats terrain sur la sécurité",
          questions: [
            { id: 'q5', label: "Selon votre expérience, quel pourcentage de vos clients PME a déjà subi une cyberattaque ?", type: 'radio', options: ['Moins de 10%', '10-25%', '25-50%', '50-75%', 'Plus de 75%'] },
            { id: 'q6', label: "Quel est le principal problème de sécurité que vous observez chez vos clients PME ?", type: 'radio', options: ['Absence totale de protection réseau', 'Solutions obsolètes ou mal configurées', 'Manque de sensibilisation des employés', 'Budget insuffisant', 'Manque de compétences IT internes', 'Complexité des solutions du marché'], hasOther: true }
          ]
        },
        {
          name: "Solutions déployées",
          questions: [
            { id: 'q7', label: "Quelles solutions de sécurité réseau recommandez-vous le plus souvent ?", type: 'checkbox', options: ['Pare-feu matériel (Fortinet, Cisco)', 'Pare-feu logiciel (pfSense, OPNsense)', 'IDS/IPS open-source (Snort, Suricata)', 'IDS/IPS commercial', 'UTM (Unified Threat Management)', 'Antivirus réseau / EDR', 'Solutions cloud', 'Aucune (trop complexe ou cher)'], hasOther: true },
            { id: 'q8', label: "Quelle est la principale difficulté lors du déploiement d'une solution IDS/IPS chez une PME ?", type: 'radio', options: ['Coût trop élevé', 'Configuration trop complexe', 'Manque de compétences du client', 'Trop de fausses alertes', 'Impact sur les performances', 'Infrastructure incompatible', 'Résistance au changement'], hasOther: true },
            { id: 'q9', label: "Combien de temps vous faut-il pour déployer une solution IDS/IPS complète ?", type: 'radio', options: ['Moins d\'1 jour', '1-2 jours', '3-5 jours', '1-2 semaines', 'Plus de 2 semaines'] }
          ]
        },
        {
          name: "Retours clients",
          questions: [
            { id: 'q10', label: "Quelle est la réaction la plus fréquente de vos clients face aux alertes de sécurité ?", type: 'radio', options: ['Ils réagissent rapidement', 'Ils réagissent mais avec du retard', 'Ils ignorent la plupart des alertes', 'Ils ne comprennent pas et vous appellent', 'Ils désactivent les alertes'] },
            { id: 'q11', label: "Selon vos clients, quel est le plus gros frein à l'investissement en cybersécurité ?", type: 'radio', options: ['"C\'est trop cher"', '"On est trop petit"', '"C\'est trop compliqué"', '"On n\'a pas le temps"', '"On ne comprend pas l\'utilité"'], hasOther: true },
            { id: 'q12', label: "Combien vos clients sont-ils prêts à payer annuellement pour une solution IDS/IPS ?", type: 'radio', options: ['Moins de 500 €', '500 € - 1 000 €', '1 000 € - 2 000 €', '2 000 € - 5 000 €', 'Plus de 5 000 €', 'Ils ne veulent rien payer'] }
          ]
        },
        {
          name: "Besoins et attentes",
          questions: [
            { id: 'q13', label: "Si vous pouviez améliorer UNE CHOSE dans les solutions IDS/IPS actuelles :", type: 'radio', options: ['Simplifier l\'installation (plug & play)', 'Réduire le taux de fausses alertes', 'Dashboard compréhensible par non-technicien', 'Réduire le coût', 'Améliorer la détection des menaces', 'Réduire l\'impact sur les performances'], hasOther: true },
            { id: 'q14', label: "Une solution IDS/IPS basée sur l'IA qui 'apprend' le comportement normal du réseau vous semble :", type: 'radio', options: ['Très pertinente', 'Intéressante mais je reste sceptique', 'Inutile (les signatures suffisent)', 'Inquiétante (trop de "boîte noire")', 'Je ne sais pas assez sur l\'IA'] },
            { id: 'q15', label: "Seriez-vous prêt à recommander une nouvelle solution plug & play, auto-apprenante, avec prix PME ?", type: 'radio', options: ['Oui, définitivement', 'Oui, si mes tests sont concluants', 'Peut-être, besoin de plus d\'infos', 'Non, je préfère les solutions éprouvées', 'Non, mes clients ne paieront pas'] }
          ]
        },
        {
          name: "Infrastructure typique",
          questions: [
            { id: 'q16', label: "Quelle est l'infrastructure réseau la plus fréquente chez vos clients PME ?", type: 'radio', options: ['Routeur opérateur + switchs non manageables', 'Routeur opérateur + switchs manageables', 'Routeur pro + pare-feu + switchs manageables', 'Infrastructure complète', 'Très variable'] },
            { id: 'q17', label: "Quel pourcentage de vos clients dispose de switchs 'manageables' ?", type: 'radio', options: ['Moins de 25%', '25-50%', '50-75%', 'Plus de 75%', 'Je ne sais pas'] }
          ]
        },
        {
          name: "Question finale",
          questions: [
            { id: 'q18', label: "En une phrase, quel conseil donneriez-vous à une startup qui développe une solution IDS/IPS pour PME ?", type: 'textarea' },
            { id: 'email', label: "Email (optionnel - pour tests bêta)", type: 'text', optional: true }
          ]
        }
      ]
    }
  };

  const currentSurveyData = surveys[currentSurvey];
  const totalSections = currentSurveyData.sections.length;
  const progressPercent = ((currentSection + 1) / totalSections) * 100;

  const handleInputChange = (questionId, value, isCheckbox = false) => {
    if (isCheckbox) {
      const current = formData[questionId] || [];
      const updated = current.includes(value)
        ? current.filter(v => v !== value)
        : [...current, value];
      setFormData({ ...formData, [questionId]: updated });
    } else {
      setFormData({ ...formData, [questionId]: value });
    }
  };

  const handleSubmit = async () => {
    if (!agentName.trim()) {
      alert("Veuillez indiquer le nom de l'agent sur le terrain");
      return;
    }

    setIsSubmitting(true);
    
    // Préparer les données pour Google Sheets
    const submissionData = {
      timestamp: new Date().toISOString(),
      agent: agentName,
      surveyType: currentSurvey === 'dsi' ? 'DSI/Responsables IT' : 'Prestataires IT',
      ...formData
    };

    try {
      // REMPLACEZ CETTE URL par votre URL de déploiement Google Apps Script
      const SCRIPT_URL = 'VOTRE_URL_GOOGLE_APPS_SCRIPT_ICI';
      
      const response = await fetch(SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData)
      });

      alert('✅ Réponses enregistrées avec succès !');
      
      // Réinitialiser le formulaire
      setFormData({});
      setCurrentSection(0);
      setAgentName('');
      
    } catch (error) {
      console.error('Erreur:', error);
      alert('❌ Erreur lors de l\'enregistrement. Veuillez réessayer.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderQuestion = (question) => {
    const value = formData[question.id] || (question.type === 'checkbox' ? [] : '');

    switch (question.type) {
      case 'radio':
        return (
          <div className="space-y-2">
            {question.options.map((option, idx) => (
              <label key={idx} className="flex items-center p-3 rounded-lg border border-gray-200 hover:bg-amber-50 hover:border-amber-300 cursor-pointer transition-all">
                <input
                  type="radio"
                  name={question.id}
                  value={option}
                  checked={value === option}
                  onChange={(e) => handleInputChange(question.id, e.target.value)}
                  className="w-4 h-4 text-amber-600 focus:ring-amber-500"
                />
                <span className="ml-3 text-gray-700">{option}</span>
              </label>
            ))}
            {question.hasOther && (
              <input
                type="text"
                placeholder="Autre (précisez)"
                value={value.startsWith('Autre:') ? value.replace('Autre:', '') : ''}
                onChange={(e) => handleInputChange(question.id, `Autre:${e.target.value}`)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
              />
            )}
          </div>
        );

      case 'checkbox':
        return (
          <div className="space-y-2">
            {question.options.map((option, idx) => (
              <label key={idx} className="flex items-center p-3 rounded-lg border border-gray-200 hover:bg-amber-50 hover:border-amber-300 cursor-pointer transition-all">
                <input
                  type="checkbox"
                  value={option}
                  checked={value.includes(option)}
                  onChange={(e) => handleInputChange(question.id, option, true)}
                  className="w-4 h-4 text-amber-600 rounded focus:ring-amber-500"
                />
                <span className="ml-3 text-gray-700">{option}</span>
              </label>
            ))}
            {question.hasOther && (
              <input
                type="text"
                placeholder="Autre (précisez)"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
              />
            )}
          </div>
        );

      case 'textarea':
        return (
          <textarea
            value={value}
            onChange={(e) => handleInputChange(question.id, e.target.value)}
            rows={4}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
            placeholder="Votre réponse..."
          />
        );

      case 'text':
        return (
          <input
            type="text"
            value={value}
            onChange={(e) => handleInputChange(question.id, e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
            placeholder={question.optional ? 'Optionnel' : 'Votre réponse'}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-amber-50 to-gray-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white shadow-2xl">
        <div className="max-w-4xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            {/* Logo placeholder */}
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl flex items-center justify-center shadow-lg">
                <Building2 className="w-8 h-8 text-gray-900" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Hèviosso Box</h1>
                <p className="text-amber-400 text-sm">Étude de Marché Cybersécurité</p>
              </div>
            </div>

            {/* Switch questionnaire */}
            <div className="flex gap-2 bg-gray-800 p-1 rounded-lg">
              <button
                onClick={() => { setCurrentSurvey('dsi'); setCurrentSection(0); setFormData({}); }}
                className={`px-4 py-2 rounded-md transition-all flex items-center gap-2 ${
                  currentSurvey === 'dsi'
                    ? 'bg-amber-500 text-gray-900 font-semibold shadow-lg'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                <Building2 className="w-4 h-4" />
                DSI
              </button>
              <button
                onClick={() => { setCurrentSurvey('prestataire'); setCurrentSection(0); setFormData({}); }}
                className={`px-4 py-2 rounded-md transition-all flex items-center gap-2 ${
                  currentSurvey === 'prestataire'
                    ? 'bg-amber-500 text-gray-900 font-semibold shadow-lg'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                <Users className="w-4 h-4" />
                Prestataires
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Agent field */}
      <div className="max-w-4xl mx-auto px-6 py-6">
        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-amber-500">
          <label className="flex items-center gap-3 text-gray-700 font-medium">
            <User className="w-5 h-5 text-amber-600" />
            <span>Agent sur le terrain :</span>
          </label>
          <input
            type="text"
            value={agentName}
            onChange={(e) => setAgentName(e.target.value)}
            placeholder="Nom et prénom de l'agent"
            className="mt-3 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-lg"
            required
          />
        </div>
      </div>

      {/* Progress bar */}
      <div className="max-w-4xl mx-auto px-6 pb-4">
        <div className="bg-white rounded-full h-3 shadow-inner overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-amber-500 to-amber-600 transition-all duration-500 shadow-lg"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <p className="text-center text-sm text-gray-600 mt-2 font-medium">
          Section {currentSection + 1} sur {totalSections}
        </p>
      </div>

      {/* Main content */}
      <div className="max-w-4xl mx-auto px-6 pb-12">
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          {currentSection === 0 && (
            <div className="mb-8 p-6 bg-gradient-to-r from-amber-50 to-gray-50 rounded-xl border border-amber-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-3">{currentSurveyData.title}</h2>
              <p className="text-gray-700 leading-relaxed">{currentSurveyData.intro}</p>
            </div>
          )}

          <div className="mb-6">
            <h3 className="text-xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-amber-500">
              {currentSurveyData.sections[currentSection].name}
            </h3>

            <div className="space-y-8">
              {currentSurveyData.sections[currentSection].questions.map((question, idx) => (
                <div key={question.id} className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                  <label className="block text-gray-800 font-semibold mb-4 text-lg">
                    {idx + 1}. {question.label}
                    {question.optional && <span className="text-gray-400 text-sm ml-2">(optionnel)</span>}
                  </label>
                  {renderQuestion(question)}
                </div>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center mt-8 pt-6 border-t-2 border-gray-200">
            <button
              onClick={() => setCurrentSection(Math.max(0, currentSection - 1))}
              disabled={currentSection === 0}
              className="px-6 py-3 rounded-lg font-semibold transition-all disabled:opacity-30 disabled:cursor-not-allowed bg-gray-200 text-gray-700 hover:bg-gray-300 shadow-md"
            >
              ← Précédent
            </button>

            {currentSection < totalSections - 1 ? (
              <button
                onClick={() => setCurrentSection(currentSection + 1)}
                className="px-6 py-3 rounded-lg font-semibold bg-gradient-to-r from-amber-500 to-amber-600 text-white hover:from-amber-600 hover:to-amber-700 shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
              >
                Suivant
                <ArrowRight className="w-5 h-5" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="px-8 py-3 rounded-lg font-bold bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700 shadow-lg hover:shadow-xl transition-all disabled:opacity-50 flex items-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Envoi en cours...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Envoyer les réponses
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="max-w-4xl mx-auto px-6 pb-8">
        <div className="text-center text-gray-600 text-sm">
          <p>© 2024 Hèviosso Box - Étude confidentielle</p>
          <p className="mt-1">Vos réponses sont anonymisées et sécurisées</p>
        </div>
      </div>
    </div>
  );
};

export default HeviossoSurvey;