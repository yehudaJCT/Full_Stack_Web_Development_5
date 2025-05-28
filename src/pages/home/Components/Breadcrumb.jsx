import React from 'react';
import { useUrlNavigation } from '../../../hooks/useUrlNavigation';

const Breadcrumb = () => {
  const { parseCurrentUrl, navigateToSection, navigateToHome } = useUrlNavigation();
  const urlState = parseCurrentUrl();

  const breadcrumbItems = [];

  // Add home/user
  breadcrumbItems.push({
    label: `User ${urlState.userId}`,
    onClick: () => navigateToHome(),
    isActive: !urlState.activeTab
  });

  // Add main section
  if (urlState.activeTab) {
    breadcrumbItems.push({
      label: urlState.activeTab.charAt(0).toUpperCase() + urlState.activeTab.slice(1),
      onClick: () => navigateToSection(urlState.activeTab),
      isActive: !urlState.activeItemId
    });
  }

  // Add specific item
  if (urlState.activeItemId) {
    let itemLabel = `${urlState.activeTab.slice(0, -1)} ${urlState.activeItemId}`;
    breadcrumbItems.push({
      label: itemLabel,
      onClick: null, // Current page, no navigation
      isActive: !urlState.subSection
    });
  }

  // Add sub-section (like photos)
  if (urlState.subSection) {
    breadcrumbItems.push({
      label: urlState.subSection.charAt(0).toUpperCase() + urlState.subSection.slice(1),
      onClick: null,
      isActive: !urlState.subItemId
    });
  }

  // Add sub-item (like specific photo)
  if (urlState.subItemId) {
    breadcrumbItems.push({
      label: `${urlState.subSection.slice(0, -1)} ${urlState.subItemId}`,
      onClick: null,
      isActive: true
    });
  }

  return (
    <nav aria-label="breadcrumb" className="mb-3">
      <ol className="breadcrumb">
        {breadcrumbItems.map((item, index) => (
          <li 
            key={index}
            className={`breadcrumb-item ${item.isActive ? 'active' : ''}`}
            aria-current={item.isActive ? 'page' : undefined}
          >
            {item.onClick ? (
              <button
                className="btn btn-link p-0 text-decoration-none"
                style={{ fontSize: 'inherit', color: '#0d6efd' }}
                onClick={item.onClick}
              >
                {item.label}
              </button>
            ) : (
              <span>{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;