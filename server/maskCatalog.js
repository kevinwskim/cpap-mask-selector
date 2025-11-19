// Comprehensive CPAP Mask Catalog
// Updated from FINAL_CPAP_MASK_CATALOG_COMPLETE.csv

const fs = require('fs');
const path = require('path');

// Parse CSV data with proper handling of quoted fields
function parseCSVLine(line) {
  const result = [];
  let current = '';
  let inQuotes = false;
  
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      result.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  result.push(current.trim());
  return result;
}

const csvPath = path.join(__dirname, '../detail/FINAL_CPAP_MASK_CATALOG_COMPLETE.csv');
const csvData = fs.readFileSync(csvPath, 'utf-8');
const lines = csvData.split('\n').filter(line => line.trim());
const headers = parseCSVLine(lines[0]);

// Build mask catalog from CSV
const MASK_CATALOG = {};
const imageBasePath = '/detail/image/';

for (let i = 1; i < lines.length; i++) {
  const values = parseCSVLine(lines[i]);
  const mask = {};
  
  headers.forEach((header, index) => {
    let value = values[index]?.trim() || '';
    // Remove quotes if present
    if (value.startsWith('"') && value.endsWith('"')) {
      value = value.slice(1, -1);
    }
    mask[header.trim()] = value;
  });
  
  // Create catalog entry
  const key = `${mask.Brand} ${mask.Model}`;
  const imageName = getImageName(mask.Brand, mask.Model);
  
  // Build description from design and type
  const description = `${mask.Design} ${mask.Type.toLowerCase()}${mask['Cushion Material'] ? ` with ${mask['Cushion Material']}` : ''}`;
  
  MASK_CATALOG[key] = {
    brand: mask.Brand,
    type: mask.Type,
    name: `${mask.Brand} ${mask.Model}`,
    model: mask.Model,
    design: mask.Design,
    connection: mask.Connection,
    cushionMaterial: mask['Cushion Material'],
    pressureRange: mask['Pressure Range'],
    weight: mask.Weight,
    soundLevel: mask['Sound Level'],
    magneticClips: mask['Magnetic Clips'] === 'Yes',
    keyFeatures: mask['Key Features'] ? mask['Key Features'].split(',').map(f => f.trim()) : [],
    bestFor: mask['Best For'] ? mask['Best For'].split(',').map(f => f.trim()) : [],
    algorithmMatch: mask['Algorithm Match'] || '',
    address: mask.Address || '',
    imagePath: imageName ? `${imageBasePath}${imageName}` : null,
    description: description,
    tubeUp: mask.Connection === 'Top',
    skinFriendly: mask['Cushion Material']?.toLowerCase().includes('fabric') || 
                  mask['Cushion Material']?.toLowerCase().includes('memory foam') ||
                  mask['Cushion Material']?.toLowerCase().includes('gel') ||
                  mask['Cushion Material']?.toLowerCase().includes('comfisoft'),
    facialHairCompatible: mask.Type === 'Nasal Pillows' || 
                          mask.Type === 'Total Face' ||
                          mask.Model?.includes('FitLife')
  };
}

// Helper function to map model names to image files
function getImageName(brand, model) {
  const imageMap = {
    'ResMed AirFit P10': 'AirFit P10.jpg',
    'ResMed AirFit P30i': 'AirFit P30i.jpg',
    'ResMed AirFit N20': 'AirFit N20.jpg',
    'ResMed AirFit N20 Classic': 'AirFit N20 Classic.PNG',
    'ResMed AirFit N30': 'AirFit N30.jpg',
    'ResMed AirFit N30i': 'AirFit N30i.jpeg',
    'ResMed AirTouch N30i': 'AirTouch N30i.jpg',
    'ResMed AirFit X30i': 'AirFit X30i.jpg',
    'ResMed AirFit F20': 'AirFit F20.jpg',
    'ResMed AirTouch F20': 'AirTouch F20.jpg',
    'ResMed AirFit F30': 'AirFit F30.jpg',
    'ResMed AirFit F30i': 'AirFit F30i.jpg',
    'ResMed AirFit F40': 'AirFit F40.jpg',
    'ResMed Mirage Quattro': 'Mirage Quattro.jpg',
    'ResMed Quattro Air': 'Quattro Air.PNG',
    'Philips DreamWear Silicone Pillows': 'DreamWear Silicone Pillows.PNG',
    'Philips Pico': 'Pico.PNG',
    'Philips DreamWear Nasal': 'DreamWear.PNG',
    'Philips DreamWear Gel Nasal': 'DreamWear.PNG',
    'Philips DreamWisp Nasal': 'DreamWispNasal.PNG',
    'Philips Wisp Nasal': 'Wisp.PNG',
    'Philips Nuance': 'Nuance.PNG',
    'Philips ComfortGel Blue': 'ComfortGel Blue.PNG',
    'Philips DreamWear Full Face': 'DreamWear Full Face.PNG',
    'Philips Amara': 'Amara.PNG',
    'Philips Amara Gel': 'Amara Gel.PNG',
    'Philips Amara View': 'Amara View.PNG',
    'Philips TrueBlue': 'TrueBlue.PNG',
    'Philips FitLife Total Face': 'FitLife Total Face.PNG'
  };
  
  return imageMap[`${brand} ${model}`] || null;
}

// Get masks by criteria with optimized matching
function getMasksByCriteria(criteria) {
  const {
    maskType,
    tubeUp = null,
    skinFriendly = null,
    facialHairCompatible = null,
    sleepPosition = null,
    claustrophobic = false,
    skinSensitivity = false,
    facialHair = false,
    breathing = null,
    nasal = null,
    sleepMovement = null,
    assistant = false,
    adjustment = false
  } = criteria;

  let masks = Object.values(MASK_CATALOG);

  // Map algorithm mask types to catalog types
  const typeMap = {
    'NASAL_MASK': 'Nasal Mask',
    'NASAL_PILLOWS': 'Nasal Pillows',
    'FULL_FACE': 'Full Face'
  };
  
  const catalogType = typeMap[maskType] || maskType;

  // Filter by mask type
  if (maskType) {
    masks = masks.filter(m => {
      // Try exact match first
      if (m.type === catalogType) return true;
      // Try algorithm type format
      if (m.type === maskType) return true;
      // Try case-insensitive match
      return m.type.toLowerCase() === catalogType.toLowerCase();
    });
  }

  // Filter by tube-up requirement
  if (tubeUp === true) {
    masks = masks.filter(m => m.tubeUp === true);
  }

  // Filter by skin friendliness
  if (skinFriendly === true || skinSensitivity) {
    masks = masks.filter(m => m.skinFriendly === true);
  }

  // Filter by facial hair compatibility
  if (facialHairCompatible === true || facialHair) {
    masks = masks.filter(m => m.facialHairCompatible === true);
  }

  // Score masks based on algorithm match and criteria
  const scoredMasks = masks.map(mask => {
    let score = 0;
    let reasons = [];
    let selectionExplanation = '';

    // Check algorithm match string for direct matches
    const algoMatch = mask.algorithmMatch.toLowerCase();
    
    // Breathing type matching
    if (breathing === 'nose_only' && algoMatch.includes('nose-only')) {
      score += 40;
      reasons.push('Perfect match for nose-only breathing');
    }
    if (breathing === 'mouth_only' && algoMatch.includes('mouth-only')) {
      score += 40;
      reasons.push('Perfect match for mouth-only breathing');
    }
    if (breathing === 'mixed' && algoMatch.includes('mixed')) {
      score += 40;
      reasons.push('Perfect match for mixed breathing');
    }

    // Sleep position scoring
    if (sleepPosition === 'side' || sleepPosition === 'stomach') {
      if (mask.tubeUp) {
        score += 30;
        reasons.push('Tube-up design ideal for side/stomach sleepers');
      }
      if (algoMatch.includes('side')) {
        score += 25;
        reasons.push('Specifically designed for side sleepers');
      }
    }

    // Claustrophobic scoring
    if (claustrophobic) {
      if (mask.type === 'Nasal Pillows') {
        score += 25;
        reasons.push('Nasal pillows provide minimal contact');
      }
      if (algoMatch.includes('claustrophobic')) {
        score += 30;
        reasons.push('Specifically designed for claustrophobic patients');
      }
      if (mask.design?.toLowerCase().includes('minimal')) {
        score += 20;
        reasons.push('Minimal contact design reduces claustrophobia');
      }
    }

    // Skin sensitivity scoring
    if (skinSensitivity) {
      if (mask.skinFriendly) {
        score += 25;
        reasons.push('Skin-friendly materials reduce irritation');
      }
      if (algoMatch.includes('skin sensitivity') || algoMatch.includes('sensitive skin')) {
        score += 30;
        reasons.push('Specifically designed for sensitive skin');
      }
    }

    // Facial hair scoring
    if (facialHair) {
      if (mask.facialHairCompatible) {
        score += 35;
        reasons.push('Compatible with facial hair for proper seal');
      }
      if (mask.type === 'Total Face') {
        score += 40;
        reasons.push('Total face mask provides best seal with facial hair');
      }
    }

    // Movement scoring
    if (sleepMovement === 'all_the_time') {
      if (mask.tubeUp) {
        score += 20;
        reasons.push('Tube-up design maintains seal during movement');
      }
      if (algoMatch.includes('active') || algoMatch.includes('movement')) {
        score += 25;
        reasons.push('Designed for active sleepers');
      }
    }

    // Assistant scoring
    if (assistant && mask.magneticClips) {
      score += 30;
      reasons.push('Magnetic clips enable easy removal for assistants');
    }

    // Adjustment issues scoring
    if (adjustment && mask.magneticClips) {
      score += 25;
      reasons.push('Magnetic clips reduce need for manual adjustments');
    }

    // Build selection explanation
    if (reasons.length > 0) {
      selectionExplanation = reasons.join('. ') + '.';
    } else {
      selectionExplanation = `Selected because it matches your ${mask.type.toLowerCase()} needs based on your responses.`;
    }

    return {
      ...mask,
      score,
      selectionReasons: reasons,
      selectionExplanation
    };
  });

  // Sort by score
  scoredMasks.sort((a, b) => b.score - a.score);

  return scoredMasks;
}

// Generate selection explanation for a mask
function generateSelectionExplanation(mask, responses, allFactors) {
  if (mask.selectionExplanation) {
    return mask.selectionExplanation;
  }
  
  const explanations = [];
  explanations.push(`Selected because it matches your ${mask.type.toLowerCase()} needs`);

  if (mask.selectionReasons && mask.selectionReasons.length > 0) {
    explanations.push(...mask.selectionReasons);
  }

  return explanations.join('. ') + '.';
}

module.exports = {
  MASK_CATALOG,
  getMasksByCriteria,
  generateSelectionExplanation
};
