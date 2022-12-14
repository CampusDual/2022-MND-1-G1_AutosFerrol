package com.example.demo.entity;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "contacts")
public class Contact implements Serializable{


	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	
	@Column(nullable=false)
	private String brand;
	
	@Column(nullable=false)
	private String model;
	
	@Column(nullable=false)
	private String price;
	
	@Column(nullable=false, unique = false)
	private String colour;
	
	

	public Contact() {
	}
	
	public Contact(String brand, String model, String price, String colour) {
		this.brand = brand;
		this.model = model;
		this.price = price;
		this.colour = colour;
		
	}

	public Contact(Integer id, String brand, String model, String price, String colour) {
		this(brand, model, price, colour);
		this.id = id;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getBrand() {
		return brand;
	}

	public void setBrand(String brand) {
		this.brand = brand;
	}

	public String getModel() {
		return model;
	}

	public void setModel(String model) {
		this.model = model;
	}

	public String getPrice() {
		return price;
	}

	public void setPrice(String price) {
		this.price = price;
	}

	public String getColour() {
		return colour;
	}

	public void setColour(String colour) {
		this.colour = colour;
	}

	
	private static final long serialVersionUID = 1L;
}