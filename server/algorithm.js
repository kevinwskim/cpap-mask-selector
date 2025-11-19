// CPAP Mask Selection Algorithm - Complete 12-Factor Implementation

// STEP 1: SAFETY CHECK (Critical Constraints)
function checkSafetyConstraints(responses) {
  const constraints = {
    canUseFullFace: true,
    canUseMagnetic: true,
    requiresEasyRemoval: false,
    safetyFlags: []
  };
  
  // Eye/Reflux/Drug = NO FULL FACE
  if (responses.eye || responses.drug) {
    constraints.canUseFullFace = false;
    constraints.safetyFlags.push({
      severity: 'CRITICAL',
      message: 'Full face contraindicated - aspiration risk',
      restriction: 'NASAL_ONLY'
    });
  }
  
  // Assistant = EASY REMOVAL REQUIRED
  if (responses.assistant) {
    constraints.requiresEasyRemoval = true;
    constraints.safetyFlags.push({
      severity: 'CRITICAL',
      message: 'Easy removal mechanism required for safety',
      requirement: 'MAGNETIC_OR_EASY_REMOVAL'
    });
  }
  
  // Implant = NO MAGNETIC
  if (responses.implant) {
    constraints.canUseMagnetic = false;
    constraints.safetyFlags.push({
      severity: 'MODERATE',
      message: 'Magnetic headgear contraindicated',
      restriction: 'NON_MAGNETIC_ONLY'
    });
  }
  
  return constraints;
}

// STEP 2: PRIMARY MASK TYPE (Breathing + Nasal)
function determinePrimaryMaskType(responses, constraints) {
  const { breathing, nasal } = responses;
  let category = '';
  let successRate = '';
  let initialModels = [];
  const notes = [];
  
  // Nose-only + No obstruction → Nasal Pillows/Mask
  if (breathing === 'nose_only' && (nasal === 'no_obstruction' || !nasal)) {
    category = 'NASAL_MASK';
    successRate = '85-90%';
    initialModels = [
      'ResMed AirFit N20',
      'ResMed AirFit N30i',
      'Philips DreamWear Nasal'
    ];
    notes.push('Nose-only breathing with no nasal obstruction - ideal for nasal masks');
  }
  // Mouth-only → Full Face (if not contraindicated)
  else if (breathing === 'mouth_only') {
    if (!constraints.canUseFullFace) {
      category = 'NASAL_MASK';
      successRate = '60-70%';
      notes.push('WARNING: Mouth breathing but full face contraindicated. Nasal mask with chin strap required.');
      initialModels = [
        'ResMed AirFit N20 + Chin Strap',
        'ResMed AirFit N30i + Chin Strap'
      ];
    } else {
      category = 'FULL_FACE';
      successRate = '80-85%';
      initialModels = [
        'ResMed AirFit F20',
        'ResMed AirFit F30',
        'Philips DreamWear Full Face'
      ];
      notes.push('Mouth breathing requires full face mask for effective therapy');
    }
  }
  // Mixed → Multiple approaches
  else if (breathing === 'mixed') {
    if (!constraints.canUseFullFace) {
      category = 'NASAL_MASK';
      successRate = '70-80%';
      notes.push('Mixed breathing but full face contraindicated. Nasal mask with chin strap or mouth tape required.');
      initialModels = [
        'ResMed AirFit N20 + Chin Strap',
        'ResMed AirFit N30i + Chin Strap'
      ];
    } else {
      category = 'FULL_FACE';
      successRate = '75-85%';
      initialModels = [
        'ResMed AirFit F20',
        'ResMed AirFit F30',
        'Philips DreamWear Full Face'
      ];
      notes.push('Mixed breathing - full face recommended, or nasal with chin strap');
    }
  }
  
  // Nasal obstruction modifications
  if (nasal === 'severe_obstruction') {
    if (constraints.canUseFullFace) {
      category = 'FULL_FACE';
      successRate = '80-85%';
      initialModels = [
        'ResMed AirFit F20',
        'ResMed AirFit F30',
        'Philips DreamWear Full Face'
      ];
      notes.push('Severe nasal obstruction requires full face mask');
    }
  } else if (nasal === 'mild_obstruction') {
    if (category === 'NASAL_MASK') {
      notes.push('Mild obstruction - consider dual approach or full face');
    }
  } else if (nasal === 'deviated_septum') {
    if (constraints.canUseFullFace) {
      category = 'FULL_FACE';
      notes.push('Deviated septum - full face preferred');
    }
  } else if (nasal === 'seasonal_allergies') {
    notes.push('Seasonal allergies - consider heated humidifier');
  }
  
  return {
    category,
    successRate,
    specificModels: initialModels,
    notes
  };
}

// STEP 3: APPLY STRONG MODIFIERS (Claustrophobic, Facial Hair, Sleep Position)
function applyStrongModifiers(primaryMask, responses) {
  let modifiedRecommendation = { ...primaryMask };
  const modificationNotes = [];
  
  // CLAUSTROPHOBIC (Weight: 80)
  if (responses.claustrophobic) {
    if (modifiedRecommendation.category === 'NASAL_MASK') {
      modifiedRecommendation.category = 'NASAL_PILLOWS';
      modifiedRecommendation.specificModels = [
        'ResMed AirFit P10',
        'ResMed AirFit P30i',
        'Philips DreamWear Silicone Pillows'
      ];
      modificationNotes.push({
        factor: 'Claustrophobic',
        weight: 80,
        change: 'Switched from Nasal Mask to Nasal Pillows (minimal contact)',
        rationale: 'Claustrophobic patients strongly prefer minimal facial contact'
      });
    } else if (modifiedRecommendation.category === 'FULL_FACE') {
      modifiedRecommendation.specificModels = [
        'ResMed AirFit F40 (smallest)',
        'ResMed AirFit F30 (under-nose)',
        'Philips Amara View (open field of vision)'
      ];
      modificationNotes.push({
        factor: 'Claustrophobic',
        weight: 80,
        change: 'Selected minimal-contact full face models',
        rationale: 'Full face required but chose least invasive designs',
        warning: 'May need extra support/reassurance due to claustrophobia + full face conflict'
      });
    }
  }
  
  // FACIAL HAIR (Weight: 75)
  if (responses.facialHair) {
    if (modifiedRecommendation.category === 'NASAL_MASK') {
      modifiedRecommendation.category = 'NASAL_PILLOWS';
      modifiedRecommendation.specificModels = [
        'ResMed AirFit P10',
        'ResMed AirFit P30i',
        'Philips DreamWear Silicone Pillows'
      ];
      modificationNotes.push({
        factor: 'Facial Hair',
        weight: 75,
        change: 'REQUIRED switch from Nasal Mask to Nasal Pillows',
        rationale: 'Traditional nasal cushions fail to seal with facial hair (20-30% success)',
        contraindication: 'AVOID: Traditional nasal cushion masks (AirFit N20, Wisp Nasal)'
      });
    } else if (modifiedRecommendation.category === 'FULL_FACE') {
      modifiedRecommendation.specificModels = [
        'Philips FitLife Total Face (best for facial hair)',
        'ResMed AirFit F20 + Fabric Liners',
        'Philips DreamWear Full Face + Liners'
      ];
      if (!modifiedRecommendation.requiredAccessories) {
        modifiedRecommendation.requiredAccessories = [];
      }
      modifiedRecommendation.requiredAccessories.push('Fabric Cushion Liners or Covers');
      modificationNotes.push({
        factor: 'Facial Hair',
        weight: 75,
        change: 'Selected facial-hair-compatible full face designs',
        rationale: 'Total face seal or fabric liners improve seal with facial hair'
      });
    }
  }
  
  // SLEEP POSITION (Weight: 70)
  if (responses.sleepPosition === 'side' || responses.sleepPosition === 'stomach') {
    if (modifiedRecommendation.category === 'NASAL_PILLOWS' || 
        modifiedRecommendation.category === 'NASAL_MASK') {
      modifiedRecommendation.specificModels = [
        'ResMed AirFit P30i (tube-up)',
        'ResMed AirFit N30i (tube-up)',
        'Philips DreamWear Nasal (tube-up)',
        'Philips DreamWear Silicone Pillows (tube-up)'
      ];
      modificationNotes.push({
        factor: 'Sleep Position',
        weight: 70,
        change: 'Prioritized tube-up designs',
        rationale: `${responses.sleepPosition} sleepers benefit from top-of-head tubing (pillow-friendly)`
      });
    } else if (modifiedRecommendation.category === 'FULL_FACE') {
      modifiedRecommendation.specificModels = [
        'ResMed AirFit F30i (tube-up)',
        'Philips DreamWear Full Face (tube-up)'
      ];
      modificationNotes.push({
        factor: 'Sleep Position',
        weight: 70,
        change: 'Selected tube-up full face designs',
        rationale: `${responses.sleepPosition} sleepers need pillow-compatible design`
      });
    }
  } else if (responses.sleepPosition === 'sitting') {
    modificationNotes.push({
      factor: 'Sleep Position',
      weight: 70,
      change: 'No mask modification',
      rationale: 'Sitting upright may indicate orthopnea or other condition',
      warning: 'Consider evaluation for underlying sleep disorder (CHF, COPD)'
    });
  }
  
  return {
    modifiedRecommendation,
    modificationNotes
  };
}

// STEP 4: APPLY MODERATE MODIFIERS (Movement, Skin, Adjustment)
function applyModerateModifiers(recommendation, responses) {
  const refinements = { ...recommendation };
  const refinementNotes = [];
  
  // SLEEP MOVEMENT (Weight: 60)
  if (responses.sleepMovement === 'all_the_time') {
    if (refinements.category === 'NASAL_MASK') {
      refinements.alternativeCategory = 'NASAL_PILLOWS';
      refinements.alternativeModels = [
        'ResMed AirFit P10',
        'ResMed AirFit P30i'
      ];
      refinementNotes.push({
        factor: 'Sleep Movement',
        weight: 60,
        suggestion: 'Consider Nasal Pillows instead of Nasal Mask',
        rationale: 'Nasal pillows maintain seal better during frequent position changes',
        implementation: 'Enhanced headgear + over-the-head design recommended'
      });
    }
    
    refinements.attachmentRequirement = 'ENHANCED_HEADGEAR';
    refinementNotes.push({
      factor: 'Sleep Movement',
      weight: 60,
      change: 'Enhanced 4-point headgear required',
      rationale: 'High movement requires superior seal stability'
    });
  }
  
  // SKIN SENSITIVITY (Weight: 55)
  if (responses.skinSensitivity) {
    const skinFriendlyModels = {
      'NASAL_PILLOWS': [
        'Philips DreamWear Silicone Pillows (soft silicone)',
        'ResMed AirFit P30i (soft pillows)'
      ],
      'NASAL_MASK': [
        'ResMed AirTouch N30i (fabric-wrapped - BEST for sensitive skin)',
        'Philips DreamWear Gel Nasal (gel cushion)',
        'ResMed AirFit N30i (soft cradle design)'
      ],
      'FULL_FACE': [
        'ResMed AirTouch F20 (memory foam cushion - BEST)',
        'Philips Amara Gel (gel cushion)',
        'ResMed AirFit F20 + Gel/Fabric liners'
      ]
    };
    
    if (skinFriendlyModels[refinements.category]) {
      refinements.specificModels = skinFriendlyModels[refinements.category];
      if (!refinements.requiredAccessories) {
        refinements.requiredAccessories = [];
      }
      refinements.requiredAccessories.push(
        'Gel Cushions or Memory Foam',
        'Hypoallergenic Silicone (latex-free)',
        'Fabric Cushion Covers'
      );
      refinementNotes.push({
        factor: 'Skin Sensitivity',
        weight: 55,
        change: 'Selected skin-sensitive materials',
        rationale: 'Gel/fabric/memory foam reduce irritation and allergic reactions',
        priority: 'HIGHLY RECOMMENDED accessories'
      });
    }
  }
  
  // ADJUSTMENT ISSUES (Weight: 50)
  if (responses.adjustment) {
    refinements.attachmentPreference = 'AUTO_ADJUSTING';
    refinements.designPreference = 'SIMPLIFIED';
    
    refinementNotes.push({
      factor: 'Adjustment Issues',
      weight: 50,
      change: 'Auto-adjusting headgear recommended',
      rationale: 'Minimizes manual strap adjustments for patients with arthritis/dexterity issues',
      implementation: 'Look for magnetic clips, auto-adjusting frames, fewer adjustment points'
    });
    
    if (responses.assistant) {
      refinementNotes.push({
        factor: 'Adjustment Issues + Assistant',
        interaction: true,
        priority: 'CRITICAL',
        recommendation: 'Magnetic quick-release is IDEAL (easy removal + no manual adjustment)',
        note: 'Solves both problems simultaneously'
      });
    }
  }
  
  return {
    refinedRecommendation: refinements,
    refinementNotes
  };
}

// STEP 5: ATTACHMENT METHOD SELECTION
function determineAttachmentComprehensive(maskType, responses) {
  const attachmentScores = [];
  
  // MAGNETIC QUICK-RELEASE
  let magneticScore = 0;
  if (responses.assistant && !responses.implant) {
    magneticScore = 100; // REQUIRED
  } else if (responses.adjustment && !responses.implant) {
    magneticScore = 90; // Highly recommended
  } else if (responses.implant) {
    magneticScore = 0; // CONTRAINDICATED
  } else {
    magneticScore = 70; // Optional premium
  }
  attachmentScores.push({
    type: 'Magnetic Quick-Release',
    score: magneticScore,
    reason: responses.assistant ? 'REQUIRED for easy removal' : 
            responses.adjustment ? 'Ideal for adjustment issues' :
            responses.implant ? 'CONTRAINDICATED (implants)' : 'Optional'
  });
  
  // AUTO-ADJUSTING HEADGEAR
  let autoAdjustScore = 0;
  if (responses.adjustment) {
    autoAdjustScore = 90;
  } else {
    autoAdjustScore = 60; // Generally beneficial
  }
  attachmentScores.push({
    type: 'Auto-Adjusting Headgear',
    score: autoAdjustScore,
    reason: responses.adjustment ? 'HIGHLY RECOMMENDED for dexterity issues' : 'Beneficial'
  });
  
  // ENHANCED 4-POINT (for movement)
  let enhancedScore = 0;
  if (responses.sleepMovement === 'all_the_time') {
    enhancedScore = 85;
  } else if (responses.sleepMovement === 'some') {
    enhancedScore = 70;
  } else {
    enhancedScore = 50;
  }
  attachmentScores.push({
    type: 'Enhanced 4-Point Headgear',
    score: enhancedScore,
    reason: responses.sleepMovement === 'all_the_time' ? 'REQUIRED for seal stability' : 'Optional'
  });
  
  // OVER-THE-HEAD (for side/stomach sleepers)
  let overHeadScore = 0;
  if (responses.sleepPosition === 'side' || responses.sleepPosition === 'stomach') {
    overHeadScore = 75;
  } else {
    overHeadScore = 50;
  }
  attachmentScores.push({
    type: 'Over-the-Head Headgear',
    score: overHeadScore,
    reason: (responses.sleepPosition === 'side' || responses.sleepPosition === 'stomach') 
      ? 'RECOMMENDED for side/stomach sleepers' : 'Optional'
  });
  
  // HALO-STYLE (for facial hair)
  let haloScore = 0;
  if (responses.facialHair) {
    haloScore = 80;
  } else {
    haloScore = 50;
  }
  attachmentScores.push({
    type: 'Halo-Style Headgear',
    score: haloScore,
    reason: responses.facialHair ? 'RECOMMENDED for facial hair seal' : 'Optional'
  });
  
  // DEFAULT OPTIONS (based on mask type)
  if (maskType === 'FULL_FACE') {
    attachmentScores.push({
      type: 'Standard 4-Point Headgear',
      score: 60,
      reason: 'Default for full face'
    });
  } else {
    attachmentScores.push({
      type: 'Standard Elastic Headgear',
      score: 60,
      reason: 'Default for nasal masks'
    });
  }
  
  // Sort by score
  attachmentScores.sort((a, b) => b.score - a.score);
  
  return {
    primary: attachmentScores[0],
    alternatives: attachmentScores.slice(1, 4),
    allOptions: attachmentScores
  };
}

// STEP 6: ACCESSORY SELECTION
function determineAccessoriesComprehensive(maskType, responses) {
  const accessories = [];
  
  // ESSENTIAL accessories
  if (responses.breathing === 'mouth_only' || responses.nasal === 'seasonal_allergies') {
    accessories.push({
      item: 'Heated Humidifier',
      priority: 'ESSENTIAL',
      reason: responses.breathing === 'mouth_only' 
        ? 'Mouth breathing causes severe dryness' 
        : 'Reduces nasal congestion',
      weight: 100
    });
  }
  
  // HIGHLY RECOMMENDED accessories
  if (responses.skinSensitivity) {
    accessories.push(
      {
        item: 'Gel Cushions or Memory Foam',
        priority: 'HIGHLY RECOMMENDED',
        reason: 'Gentle on sensitive skin, reduces pressure points',
        weight: 90
      },
      {
        item: 'Hypoallergenic Silicone (latex-free)',
        priority: 'HIGHLY RECOMMENDED',
        reason: 'Prevents allergic reactions',
        weight: 90
      },
      {
        item: 'Fabric Cushion Covers',
        priority: 'RECOMMENDED',
        reason: 'Barrier between skin and silicone',
        weight: 80
      }
    );
  }
  
  if (responses.facialHair && !responses.skinSensitivity) {
    accessories.push({
      item: 'Fabric Cushion Covers',
      priority: 'HIGHLY RECOMMENDED',
      reason: 'Improves seal with facial hair',
      weight: 85
    });
  }
  
  // RECOMMENDED accessories
  if (responses.breathing === 'mixed') {
    const mouthTapeSafe = !responses.eye && !responses.drug && !responses.assistant;
    
    accessories.push({
      item: 'Chin Strap',
      priority: 'RECOMMENDED for Trial Approach B',
      reason: 'Helps keep mouth closed during nasal mask trial',
      weight: 70
    });
    
    if (mouthTapeSafe) {
      accessories.push({
        item: 'Mouth Tape (MyoTape)',
        priority: 'RECOMMENDED for Trial Approach B-ALT',
        reason: 'Direct mouth closure, alternative to chin strap',
        weight: 70,
        safetyNote: 'Use only CPAP-safe tape with emergency opening'
      });
    }
  }
  
  // Sort by weight
  accessories.sort((a, b) => b.weight - a.weight);
  
  return accessories;
}

// MAIN ALGORITHM FUNCTION
function calculateMaskRecommendation(responses) {
  // Step 1: Safety Check
  const constraints = checkSafetyConstraints(responses);
  
  // Step 2: Primary Mask Type
  const primaryMask = determinePrimaryMaskType(responses, constraints);
  
  // Step 3: Apply Strong Modifiers
  const { modifiedRecommendation, modificationNotes } = applyStrongModifiers(primaryMask, responses);
  
  // Step 4: Apply Moderate Modifiers
  const { refinedRecommendation, refinementNotes } = applyModerateModifiers(modifiedRecommendation, responses);
  
  // Step 5: Attachment Method
  const attachment = determineAttachmentComprehensive(refinedRecommendation.category, responses);
  
  // Step 6: Accessories
  const accessories = determineAccessoriesComprehensive(refinedRecommendation.category, responses);
  
  // Combine all accessories
  const allAccessories = [
    ...(refinedRecommendation.requiredAccessories || []).map(item => ({
      item,
      priority: 'REQUIRED',
      weight: 95
    })),
    ...accessories
  ];
  
  // Remove duplicates
  const uniqueAccessories = allAccessories.filter((acc, index, self) =>
    index === self.findIndex(a => a.item === acc.item)
  );
  
  // Calculate factor influence summary
  const factorCount = {
    maskType: 0,
    attachment: 0,
    accessories: 0
  };
  
  if (responses.breathing || responses.nasal) factorCount.maskType++;
  if (responses.claustrophobic || responses.facialHair || responses.sleepPosition) factorCount.maskType++;
  if (responses.sleepMovement || responses.skinSensitivity) factorCount.maskType++;
  if (responses.adjustment || responses.assistant || responses.implant) factorCount.attachment++;
  if (responses.sleepMovement || responses.sleepPosition) factorCount.attachment++;
  if (responses.skinSensitivity || responses.facialHair || responses.breathing) factorCount.accessories++;
  
  return {
    maskType: refinedRecommendation.category,
    specificModels: refinedRecommendation.specificModels || [],
    alternativeModels: refinedRecommendation.alternativeModels || [],
    attachment: attachment.primary,
    attachmentAlternatives: attachment.alternatives,
    accessories: uniqueAccessories,
    successRate: refinedRecommendation.successRate || '75-85%',
    safetyFlags: constraints.safetyFlags,
    modificationNotes: [...modificationNotes, ...refinementNotes],
    factorInfluence: factorCount,
    constraints
  };
}

module.exports = {
  calculateMaskRecommendation,
  checkSafetyConstraints,
  determinePrimaryMaskType,
  applyStrongModifiers,
  applyModerateModifiers,
  determineAttachmentComprehensive,
  determineAccessoriesComprehensive
};

