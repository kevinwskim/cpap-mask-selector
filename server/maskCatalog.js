// Comprehensive CPAP Mask Catalog
// Based on detailed descriptions from the 12-factor algorithm

const MASK_CATALOG = {
  // NASAL MASKS
  'ResMed AirFit N20': {
    brand: 'ResMed',
    type: 'NASAL_MASK',
    name: 'ResMed AirFit N20',
    description: 'Traditional nasal mask with memory foam cushion option, provides comfortable seal with minimal contact',
    features: ['Memory foam cushion available', 'Traditional design', 'Comfortable seal', 'Minimal contact'],
    bestFor: ['Nose-only breathing', 'No nasal obstruction', 'Back sleepers', 'Standard headgear'],
    avoidIf: ['Facial hair (20-30% success rate)', 'Claustrophobic (prefer pillows)', 'Side/stomach sleepers (prefer tube-up)'],
    tubeUp: false,
    skinFriendly: true,
    facialHairCompatible: false
  },
  'ResMed AirFit N30i': {
    brand: 'ResMed',
    type: 'NASAL_MASK',
    name: 'ResMed AirFit N30i',
    description: 'Tube-up nasal mask with soft cradle design, ideal for side and stomach sleepers',
    features: ['Tube-up design', 'Soft cradle', 'Pillow-friendly', 'Side/stomach sleeper friendly'],
    bestFor: ['Side sleepers', 'Stomach sleepers', 'Nose-only breathing', 'No nasal obstruction'],
    avoidIf: ['Facial hair', 'Claustrophobic'],
    tubeUp: true,
    skinFriendly: true,
    facialHairCompatible: false
  },
  'ResMed AirTouch N30i': {
    brand: 'ResMed',
    type: 'NASAL_MASK',
    name: 'ResMed AirTouch N30i',
    description: 'Fabric-wrapped nasal mask - BEST for sensitive skin, tube-up design',
    features: ['Fabric-wrapped cushion', 'Tube-up design', 'Hypoallergenic', 'Sensitive skin friendly'],
    bestFor: ['Sensitive skin', 'Allergies', 'Side sleepers', 'Skin sensitivity issues'],
    avoidIf: ['Facial hair'],
    tubeUp: true,
    skinFriendly: true,
    facialHairCompatible: false
  },
  'Philips DreamWear Nasal': {
    brand: 'Philips',
    type: 'NASAL_MASK',
    name: 'Philips DreamWear Nasal',
    description: 'Under-the-nose nasal mask with tube-up design, minimal contact',
    features: ['Under-the-nose', 'Tube-up design', 'Minimal contact', 'Pillow-friendly'],
    bestFor: ['Side sleepers', 'Stomach sleepers', 'Claustrophobic patients', 'Minimal contact preference'],
    avoidIf: ['Facial hair'],
    tubeUp: true,
    skinFriendly: true,
    facialHairCompatible: false
  },
  'Philips Wisp Nasal': {
    brand: 'Philips',
    type: 'NASAL_MASK',
    name: 'Philips Wisp Nasal',
    description: 'Lightweight nasal mask with minimal contact, traditional design',
    features: ['Lightweight', 'Minimal contact', 'Traditional design', 'Comfortable'],
    bestFor: ['Back sleepers', 'Nose-only breathing', 'Lightweight preference'],
    avoidIf: ['Facial hair', 'Side/stomach sleepers', 'Claustrophobic'],
    tubeUp: false,
    skinFriendly: true,
    facialHairCompatible: false
  },
  'Philips DreamWear Gel Nasal': {
    brand: 'Philips',
    type: 'NASAL_MASK',
    name: 'Philips DreamWear Gel Nasal',
    description: 'Gel cushion nasal mask, gentle on sensitive skin',
    features: ['Gel cushion', 'Sensitive skin friendly', 'Tube-up design'],
    bestFor: ['Sensitive skin', 'Side sleepers', 'Gel preference'],
    avoidIf: ['Facial hair'],
    tubeUp: true,
    skinFriendly: true,
    facialHairCompatible: false
  },

  // NASAL PILLOWS
  'ResMed AirFit P10': {
    brand: 'ResMed',
    type: 'NASAL_PILLOWS',
    name: 'ResMed AirFit P10',
    description: 'Ultra-minimal nasal pillows, lightweight and quiet - best for claustrophobic patients',
    features: ['Ultra-minimal', 'Lightweight', 'Quiet', 'Minimal contact'],
    bestFor: ['Claustrophobic', 'Minimal contact preference', 'Back sleepers', 'Facial hair'],
    avoidIf: ['Side/stomach sleepers (prefer P30i)'],
    tubeUp: false,
    skinFriendly: true,
    facialHairCompatible: true
  },
  'ResMed AirFit P30i': {
    brand: 'ResMed',
    type: 'NASAL_PILLOWS',
    name: 'ResMed AirFit P30i',
    description: 'Tube-up nasal pillows, perfect for side/stomach sleepers, maintains seal with movement',
    features: ['Tube-up design', 'Side/stomach sleeper friendly', 'Seal retention', 'Soft pillows'],
    bestFor: ['Side sleepers', 'Stomach sleepers', 'High movement', 'Facial hair', 'Claustrophobic'],
    avoidIf: [],
    tubeUp: true,
    skinFriendly: true,
    facialHairCompatible: true
  },
  'Philips DreamWear Silicone Pillows': {
    brand: 'Philips',
    type: 'NASAL_PILLOWS',
    name: 'Philips DreamWear Silicone Pillows',
    description: 'Soft silicone pillows with tube-up frame, excellent for sensitive skin and side sleepers',
    features: ['Soft silicone', 'Tube-up design', 'Sensitive skin friendly', 'Side sleeper friendly'],
    bestFor: ['Sensitive skin', 'Side sleepers', 'Claustrophobic', 'Facial hair', 'Soft material preference'],
    avoidIf: [],
    tubeUp: true,
    skinFriendly: true,
    facialHairCompatible: true
  },
  'Philips Nuance Pro': {
    brand: 'Philips',
    type: 'NASAL_PILLOWS',
    name: 'Philips Nuance Pro',
    description: 'Gel nasal pillows with minimal contact, comfortable for sensitive users',
    features: ['Gel pillows', 'Minimal contact', 'Sensitive skin friendly'],
    bestFor: ['Sensitive skin', 'Gel preference', 'Minimal contact'],
    avoidIf: ['Side/stomach sleepers (prefer tube-up)'],
    tubeUp: false,
    skinFriendly: true,
    facialHairCompatible: true
  },

  // FULL FACE MASKS
  'ResMed AirFit F20': {
    brand: 'ResMed',
    type: 'FULL_FACE',
    name: 'ResMed AirFit F20',
    description: 'Full face mask with memory foam or silicone cushion options, standard design',
    features: ['Memory foam option', 'Silicone option', 'Standard design', 'Comfortable seal'],
    bestFor: ['Mouth breathing', 'Mixed breathing', 'Back sleepers', 'Standard use'],
    avoidIf: ['Facial hair (needs liners)', 'Claustrophobic (prefer F30/F40)', 'Side sleepers (prefer F30i)'],
    tubeUp: false,
    skinFriendly: true,
    facialHairCompatible: false
  },
  'ResMed AirFit F30': {
    brand: 'ResMed',
    type: 'FULL_FACE',
    name: 'ResMed AirFit F30',
    description: 'Under-the-nose full face mask, less invasive than traditional full face',
    features: ['Under-the-nose', 'Less invasive', 'Open field of vision', 'Minimal contact'],
    bestFor: ['Claustrophobic + mouth breathing', 'Minimal contact preference', 'Open vision needed'],
    avoidIf: ['Side sleepers (prefer F30i)', 'Facial hair (needs liners)'],
    tubeUp: false,
    skinFriendly: true,
    facialHairCompatible: false
  },
  'ResMed AirFit F30i': {
    brand: 'ResMed',
    type: 'FULL_FACE',
    name: 'ResMed AirFit F30i',
    description: 'Tube-up full face mask for side sleepers, under-the-nose design',
    features: ['Tube-up design', 'Under-the-nose', 'Side sleeper friendly', 'Pillow-friendly'],
    bestFor: ['Side sleepers', 'Stomach sleepers', 'Mouth breathing', 'Mixed breathing'],
    avoidIf: ['Facial hair (needs liners)'],
    tubeUp: true,
    skinFriendly: true,
    facialHairCompatible: false
  },
  'ResMed AirFit F40': {
    brand: 'ResMed',
    type: 'FULL_FACE',
    name: 'ResMed AirFit F40',
    description: 'Smallest full face mask, minimal contact - best for claustrophobic patients who need full face',
    features: ['Smallest size', 'Minimal contact', 'Claustrophobic friendly', 'Compact design'],
    bestFor: ['Claustrophobic + mouth breathing', 'Minimal contact preference', 'Smaller face'],
    avoidIf: ['Facial hair (needs liners)', 'Side sleepers (prefer F30i)'],
    tubeUp: false,
    skinFriendly: true,
    facialHairCompatible: false
  },
  'ResMed AirTouch F20': {
    brand: 'ResMed',
    type: 'FULL_FACE',
    name: 'ResMed AirTouch F20',
    description: 'Memory foam cushion full face mask - BEST for sensitive skin',
    features: ['Memory foam cushion', 'Sensitive skin friendly', 'Hypoallergenic', 'Comfortable'],
    bestFor: ['Sensitive skin', 'Allergies', 'Skin sensitivity', 'Memory foam preference'],
    avoidIf: ['Facial hair (needs liners)', 'Side sleepers (prefer F30i)'],
    tubeUp: false,
    skinFriendly: true,
    facialHairCompatible: false
  },
  'Philips DreamWear Full Face': {
    brand: 'Philips',
    type: 'FULL_FACE',
    name: 'Philips DreamWear Full Face',
    description: 'Under-the-nose full face with tube-up design, pillow-friendly',
    features: ['Under-the-nose', 'Tube-up design', 'Pillow-friendly', 'Side sleeper friendly'],
    bestFor: ['Side sleepers', 'Stomach sleepers', 'Mouth breathing', 'Mixed breathing'],
    avoidIf: ['Facial hair (needs liners)'],
    tubeUp: true,
    skinFriendly: true,
    facialHairCompatible: false
  },
  'Philips Amara View': {
    brand: 'Philips',
    type: 'FULL_FACE',
    name: 'Philips Amara View',
    description: 'Open field of vision full face mask, minimal contact - good for claustrophobic patients',
    features: ['Open field of vision', 'Minimal contact', 'Claustrophobic friendly', 'Under-the-nose'],
    bestFor: ['Claustrophobic + mouth breathing', 'Open vision needed', 'Minimal contact'],
    avoidIf: ['Facial hair (needs liners)', 'Side sleepers (prefer DreamWear)'],
    tubeUp: false,
    skinFriendly: true,
    facialHairCompatible: false
  },
  'Philips Amara Gel': {
    brand: 'Philips',
    type: 'FULL_FACE',
    name: 'Philips Amara Gel',
    description: 'Gel cushion full face mask, gentle on sensitive skin',
    features: ['Gel cushion', 'Sensitive skin friendly', 'Comfortable seal'],
    bestFor: ['Sensitive skin', 'Gel preference', 'Skin sensitivity'],
    avoidIf: ['Facial hair (needs liners)', 'Side sleepers'],
    tubeUp: false,
    skinFriendly: true,
    facialHairCompatible: false
  },
  'Philips FitLife Total Face': {
    brand: 'Philips',
    type: 'FULL_FACE',
    name: 'Philips FitLife Total Face',
    description: 'Total face mask - BEST for facial hair, covers entire face for superior seal',
    features: ['Total face coverage', 'Facial hair compatible', 'Superior seal', 'No facial contact issues'],
    bestFor: ['Facial hair', 'Beard/mustache', 'Seal issues with other masks', 'Full coverage needed'],
    avoidIf: ['Claustrophobic', 'Minimal contact preference'],
    tubeUp: false,
    skinFriendly: true,
    facialHairCompatible: true
  }
};

// Get masks by criteria
function getMasksByCriteria(criteria) {
  const {
    maskType,
    tubeUp = null,
    skinFriendly = null,
    facialHairCompatible = null,
    sleepPosition = null,
    claustrophobic = false,
    skinSensitivity = false,
    facialHair = false
  } = criteria;

  let masks = Object.values(MASK_CATALOG);

  // Filter by mask type
  if (maskType) {
    masks = masks.filter(m => m.type === maskType);
  }

  // Filter by tube-up requirement
  if (tubeUp === true) {
    masks = masks.filter(m => m.tubeUp === true);
  } else if (tubeUp === false) {
    masks = masks.filter(m => m.tubeUp === false);
  }

  // Filter by skin friendliness
  if (skinFriendly === true || skinSensitivity) {
    masks = masks.filter(m => m.skinFriendly === true);
  }

  // Filter by facial hair compatibility
  if (facialHairCompatible === true || facialHair) {
    masks = masks.filter(m => m.facialHairCompatible === true);
  }

  // Score masks based on criteria
  const scoredMasks = masks.map(mask => {
    let score = 0;
    let reasons = [];

    // Sleep position scoring
    if (sleepPosition === 'side' || sleepPosition === 'stomach') {
      if (mask.tubeUp) {
        score += 30;
        reasons.push('Tube-up design ideal for side/stomach sleepers');
      }
      if (mask.bestFor.some(f => f.includes('Side') || f.includes('Stomach'))) {
        score += 20;
        reasons.push('Specifically designed for side/stomach sleepers');
      }
    } else if (sleepPosition === 'back') {
      if (!mask.tubeUp || mask.tubeUp === false) {
        score += 10;
      }
    }

    // Claustrophobic scoring
    if (claustrophobic) {
      if (mask.type === 'NASAL_PILLOWS') {
        score += 25;
        reasons.push('Nasal pillows provide minimal contact for claustrophobic patients');
      }
      if (mask.bestFor.some(f => f.includes('Claustrophobic'))) {
        score += 20;
        reasons.push('Specifically designed for claustrophobic patients');
      }
      if (mask.features.some(f => f.includes('Minimal contact'))) {
        score += 15;
        reasons.push('Minimal contact design reduces claustrophobia');
      }
    }

    // Skin sensitivity scoring
    if (skinSensitivity) {
      if (mask.skinFriendly) {
        score += 20;
        reasons.push('Skin-friendly materials reduce irritation');
      }
      if (mask.bestFor.some(f => f.includes('Sensitive skin'))) {
        score += 25;
        reasons.push('Specifically designed for sensitive skin');
      }
      if (mask.features.some(f => f.includes('Memory foam') || f.includes('Gel') || f.includes('Fabric'))) {
        score += 15;
        reasons.push('Soft materials (memory foam/gel/fabric) gentle on sensitive skin');
      }
    }

    // Facial hair scoring
    if (facialHair) {
      if (mask.facialHairCompatible) {
        score += 30;
        reasons.push('Compatible with facial hair for proper seal');
      }
      if (mask.name.includes('FitLife Total Face')) {
        score += 40;
        reasons.push('Total face mask provides best seal with facial hair');
      }
    }

    return {
      ...mask,
      score,
      selectionReasons: reasons
    };
  });

  // Sort by score
  scoredMasks.sort((a, b) => b.score - a.score);

  return scoredMasks;
}

// Generate selection explanation for a mask
function generateSelectionExplanation(mask, responses, allFactors) {
  const explanations = [];

  // Base explanation
  explanations.push(`Selected because it matches your ${mask.type.replace('_', ' ').toLowerCase()} needs`);

  // Add specific reasons
  if (mask.selectionReasons && mask.selectionReasons.length > 0) {
    explanations.push(...mask.selectionReasons);
  }

  // Add feature-based explanations
  if (responses.sleepPosition === 'side' || responses.sleepPosition === 'stomach') {
    if (mask.tubeUp) {
      explanations.push('Tube-up design prevents mask displacement when sleeping on your side or stomach');
    }
  }

  if (responses.claustrophobic && mask.type === 'NASAL_PILLOWS') {
    explanations.push('Nasal pillows provide the least invasive option for claustrophobic patients');
  }

  if (responses.facialHair && mask.facialHairCompatible) {
    explanations.push('This mask design works well with facial hair, avoiding seal issues common with traditional cushions');
  }

  if (responses.skinSensitivity && mask.skinFriendly) {
    explanations.push('Skin-friendly materials reduce the risk of irritation and allergic reactions');
  }

  return explanations.join('. ') + '.';
}

module.exports = {
  MASK_CATALOG,
  getMasksByCriteria,
  generateSelectionExplanation
};

