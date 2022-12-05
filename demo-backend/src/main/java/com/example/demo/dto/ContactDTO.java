package com.example.demo.dto;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

import com.example.demo.utils.Constant;

public class ContactDTO {

	private Integer id;
	@NotEmpty(message = Constant.BRAND_REQUIRED)
	private String brand;
	
	@NotEmpty(message = Constant.MODEL_REQUIRED)
	private String model;
	
	@NotEmpty(message = Constant.PRICE_REQUIRED)
	private String price;
	
	@NotNull(message = Constant.COLOUR_REQUIRED)
	private String colour;


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

	

	
	

}
