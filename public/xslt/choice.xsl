<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
    <xsl:output method="html" indent="no" encoding="UTF-8" />

    <xsl:template match="qti-assessment-item">
        <xsl:apply-templates select="qti-item-body" />
    </xsl:template>
    <xsl:template match="qti-item-body">
        <xsl:apply-templates />
    </xsl:template>

    <xsl:template match="qti-choice-interaction">
        <xsl:apply-templates select="qti-prompt" />
        <form id="qti-choice-interaction-{@response-identifier}" class="qti-choice-container {@class}">
            <xsl:for-each select="qti-simple-choice">
                <button name="{@identifier}">
                    <xsl:apply-templates />
                </button>
            </xsl:for-each>
        </form>
    </xsl:template>
    <xsl:template match="qti-prompt">
        <div>
            <xsl:apply-templates />
        </div>
    </xsl:template>
</xsl:stylesheet>
