<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
    <xsl:output method="html" indent="no" encoding="UTF-8" />
    <xsl:param name="baseURI"></xsl:param>

    <xsl:template match="qti-assessment-item">
        <xsl:apply-templates select="qti-stylesheet" />
        <xsl:apply-templates select="qti-item-body" />
    </xsl:template>
    <xsl:template match="qti-item-body">
        <xsl:apply-templates />
    </xsl:template>

    <xsl:include href="/xslt/choice.xsl"></xsl:include>

    <xsl:template match="div|p|img|audio">
        <xsl:copy>
            <xsl:apply-templates select="@*|node()" />
        </xsl:copy>
    </xsl:template>

    <xsl:template match="qti-stylesheet">
        <xsl:variable name="newURI">
            <xsl:call-template name="replace">
                <xsl:with-param name="text" select="@href" />
                <xsl:with-param name="replace" select="'./'" />
                <xsl:with-param name="by" select="$baseURI" />
            </xsl:call-template>
        </xsl:variable>
        <link rel="stylesheet" href="{$newURI}" />
    </xsl:template>

    <xsl:template match="@*|node()">
        <xsl:copy>
            <xsl:apply-templates select="@*|node()" />
        </xsl:copy>
    </xsl:template>
    <xsl:template match="img/@src">
        <xsl:variable name="newURI">
            <xsl:call-template name="replace">
                <xsl:with-param name="text" select="." />
                <xsl:with-param name="replace" select="'./'" />
                <xsl:with-param name="by" select="$baseURI" />
            </xsl:call-template>
        </xsl:variable>
        <xsl:attribute name="src">
            <xsl:value-of select="$newURI" />
        </xsl:attribute>
    </xsl:template>
    <xsl:template match="audio/@src">
        <xsl:variable name="newURI">
            <xsl:call-template name="replace">
                <xsl:with-param name="text" select="." />
                <xsl:with-param name="replace" select="'./'" />
                <xsl:with-param name="by" select="$baseURI" />
            </xsl:call-template>
        </xsl:variable>
        <xsl:attribute name="src">
            <xsl:value-of select="$newURI" />
        </xsl:attribute>
    </xsl:template>
    <xsl:template name="replace">
        <xsl:param name="text" />
        <xsl:param name="replace" />
        <xsl:param name="by" />
        <xsl:choose>
            <xsl:when test="$text = '' or $replace = ''or not($replace)">
                <xsl:value-of select="$text" />
            </xsl:when>
            <xsl:when test="contains($text, $replace)">
                <xsl:value-of select="substring-before($text,$replace)" />
                <xsl:value-of select="$by" />
                <xsl:call-template name="replace">
                    <xsl:with-param name="text" select="substring-after($text,$replace)" />
                    <xsl:with-param name="replace" select="$replace" />
                    <xsl:with-param name="by" select="$by" />
                </xsl:call-template>
            </xsl:when>
            <xsl:otherwise>
                <xsl:value-of select="$text" />
            </xsl:otherwise>
        </xsl:choose>
    </xsl:template>
</xsl:stylesheet>
